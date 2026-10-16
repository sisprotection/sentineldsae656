'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Calculator, Check, Gauge, LockKeyhole, Menu, ShieldCheck, Truck, X } from 'lucide-react'

const navItems = ['Overview', 'Calculator', 'Security']

function MetricCard({ label, value, detail, accent = false }: { label: string; value: string; detail: string; accent?: boolean }) {
  return (
    <div className={`metric-card ${accent ? 'metric-card-accent' : ''}`}>
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
      <span className="metric-detail">{detail}</span>
    </div>
  )
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [miles, setMiles] = useState('4200')
  const [gallons, setGallons] = useState('612')
  const [price, setPrice] = useState('4.18')

  const calculation = useMemo(() => {
    const distance = Number(miles) || 0
    const fuel = Number(gallons) || 0
    const fuelPrice = Number(price) || 0
    const mpg = fuel > 0 ? distance / fuel : 0
    const cost = fuel * fuelPrice
    const baseline = 7.1
    const variance = mpg > 0 ? ((mpg - baseline) / baseline) * 100 : 0
    return { mpg, cost, variance }
  }, [miles, gallons, price])

  return (
    <main className="site-shell">
      <div className="top-track" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="Sentinel Fleet Fuel Matrix home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span><b>SENTINEL</b><small>FLEET FUEL MATRIX</small></span>
        </a>
        <nav className={mobileOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Primary navigation">
          {navItems.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}><span>0{index + 1}</span>{item}</a>)}
        </nav>
        <a className="header-cta" href="#calculator">Run a benchmark <ArrowUpRight data-icon="inline-end" /></a>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero section-grid" id="overview">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> LOCAL-FIRST / OPERATIONAL INTELLIGENCE</div>
          <h1>Every mile.<br /><em>Accounted for.</em></h1>
          <p className="hero-lede">A precision fuel benchmark matrix for commercial fleets that keeps sensitive operating data where it belongs: with you.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#calculator">Open the matrix <ArrowUpRight data-icon="inline-end" /></a>
            <a className="text-link" href="#security"><LockKeyhole data-icon="inline-start" /> Read our security stance</a>
          </div>
          <div className="hero-note"><span className="note-line" /> No account. No upload. No exposure.</div>
        </div>
        <div className="hero-visual" aria-label="Fuel efficiency matrix illustration" role="img">
          <div className="visual-corner corner-tl" /><div className="visual-corner corner-br" />
          <div className="radar-grid" />
          <div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" />
          <div className="radar-sweep" />
          <div className="fleet-pin pin-one">TRK-047 <span>7.4 MPG</span></div>
          <div className="fleet-pin pin-two">TRK-112 <span>6.8 MPG</span></div>
          <div className="fleet-pin pin-three">TRK-201 <span>7.2 MPG</span></div>
          <div className="visual-center"><Gauge /><strong>7.13</strong><span>FLEET AVG / MPG</span></div>
          <div className="visual-label label-a">LIVE BENCHMARK <b>●</b></div>
          <div className="visual-label label-b">LOCAL NODE // 01</div>
        </div>
      </section>

      <section className="signal-strip"><div><span>01</span><b>Measure without compromise</b></div><div><span>02</span><b>Model your true baseline</b></div><div><span>03</span><b>Move with signal</b></div></section>

      <section className="calculator-section section-grid" id="calculator">
        <div className="section-intro"><div className="eyebrow">// THE BENCHMARK MATRIX</div><h2>Know the number<br /><em>behind the number.</em></h2><p>Use the local calculator to establish a clean fuel-consumption baseline across a route, vehicle, or full fleet. Nothing leaves this screen.</p><div className="trust-stamp"><ShieldCheck /><span><b>PROCESSING LOCAL</b><small>Data remains in your browser</small></span></div></div>
        <div className="calculator-card">
          <div className="card-heading"><div><span className="card-index">MATRIX / 001</span><h3>Route efficiency</h3></div><Calculator /></div>
          <div className="field-grid">
            <label>Distance traveled <div className="input-wrap"><input type="number" value={miles} onChange={e => setMiles(e.target.value)} /><span>MI</span></div></label>
            <label>Fuel consumed <div className="input-wrap"><input type="number" value={gallons} onChange={e => setGallons(e.target.value)} /><span>GAL</span></div></label>
            <label>Fuel price <div className="input-wrap"><input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} /><span>USD/GAL</span></div></label>
          </div>
          <div className="result-band"><div><span>CALCULATED EFFICIENCY</span><strong>{calculation.mpg.toFixed(2)} <small>MPG</small></strong></div><div><span>ROUTE FUEL COST</span><strong>${calculation.cost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong></div><div className={calculation.variance >= 0 ? 'positive' : 'negative'}><span>VS. 7.10 MPG BASELINE</span><strong>{calculation.variance >= 0 ? '+' : ''}{calculation.variance.toFixed(1)}%</strong></div></div>
          <div className="card-foot"><span><Check /> Local calculation complete</span><span>REF: SFM-{Math.round(calculation.mpg * 100).toString().padStart(3, '0')}</span></div>
        </div>
      </section>

      <section className="security-section section-grid" id="security"><div className="security-mark"><LockKeyhole /></div><div><div className="eyebrow">// SILENT BY DESIGN</div><h2>Your fleet data is<br /><em>not our product.</em></h2><p>Sentinel is built for operators who need clarity without surrendering control. The matrix runs client-side, with no logins, no tracking pixels, and no data exhaust.</p><a className="text-link" href="#overview">Explore the architecture <ArrowUpRight data-icon="inline-end" /></a></div><div className="security-list"><div><b>01</b><span>Local-first processing</span><small>Calculations execute on-device.</small></div><div><b>02</b><span>Zero data retention</span><small>No server-side history or profiles.</small></div><div><b>03</b><span>Transparent by default</span><small>Every input, formula, and output is visible.</small></div></div></section>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><span /><span /><span /></span><b>SENTINEL FLEET FUEL MATRIX</b></div><p>Secured by <strong>Silent Security</strong> and <strong>Serpent Intelligence Systems</strong>.</p><span className="footer-code">SFM / 2026 / OPERATIONAL</span></footer>
    </main>
  )
}
