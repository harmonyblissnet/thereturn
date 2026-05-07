import { useState, useEffect, useRef } from "react";

const palette = {
  bg: "#EDE6DC",
  bgCard: "#F4EFE7",
  textDark: "#2A1C10",
  textMid: "#5A3E28",
  textLight: "#9A7E66",
  accent: "#B8860B",
  accentHover: "#9A6F08",
  accentLight: "#D4A843",
  accentSoft: "#E8C87A",
  accentGlow: "#C89A2088",
  border: "#D4C4B0",
  cardBorder: "#C8B49A",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  @import url("https://assets.mlcdn.com/fonts.css?version=1773928");

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${palette.bg}; font-family: 'Jost', sans-serif; color: ${palette.textDark}; -webkit-font-smoothing: antialiased; }

  .app { min-height: 100vh; background: ${palette.bg}; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; }

  .home { display: flex; flex-direction: column; align-items: center; gap: 44px; width: 100%; max-width: 360px; }
  .home-header { text-align: center; }

  .eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.accent}; margin-bottom: 16px; }

  .home-title { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 300; color: ${palette.textDark}; line-height: 1.35; }

  .gold-line { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, ${palette.accentLight}, transparent); margin: 0 auto; }

  .mode-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }

  .mode-card {
    background: ${palette.bgCard}; border: 1px solid ${palette.border}; border-radius: 16px;
    padding: 18px 22px; cursor: pointer; display: flex; align-items: center; gap: 16px;
    text-align: left; transition: all 0.25s ease; width: 100%; position: relative; overflow: hidden;
  }
  .mode-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, ${palette.accentSoft}, ${palette.accent});
    opacity: 0; transition: opacity 0.25s; border-radius: 16px 0 0 16px;
  }
  .mode-card:hover::before { opacity: 1; }
  .mode-card:hover { background: #fff; border-color: ${palette.accentLight}; transform: translateY(-1px); box-shadow: 0 6px 24px ${palette.accentGlow}; }

  .mode-icon { font-size: 16px; color: ${palette.accent}; min-width: 24px; text-align: center; }
  .mode-label { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 400; color: ${palette.textDark}; margin-bottom: 2px; }
  .mode-sub { font-size: 12px; font-weight: 300; color: ${palette.textLight}; letter-spacing: 0.03em; }
  .footer-tag { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.accentSoft}; font-weight: 300; }

  .flow { display: flex; flex-direction: column; align-items: center; gap: 28px; padding: 24px; width: 100%; max-width: 360px; animation: fadeIn 0.5s ease; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .flow-eyebrow { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.accent}; font-weight: 400; text-align: center; }
  .flow-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: ${palette.textDark}; line-height: 1.5; text-align: center; }
  .flow-body { font-size: 14px; font-weight: 300; color: ${palette.textMid}; line-height: 1.78; text-align: center; }

  .btn-primary {
    background: linear-gradient(135deg, ${palette.accentLight}, ${palette.accent}); color: #fff; border: none;
    border-radius: 40px; padding: 14px 40px; font-family: 'Jost', sans-serif; font-size: 13px;
    font-weight: 400; letter-spacing: 0.08em; cursor: pointer; transition: all 0.25s;
    box-shadow: 0 4px 16px ${palette.accentGlow};
  }
  .btn-primary:hover { background: linear-gradient(135deg, ${palette.accent}, ${palette.accentHover}); transform: translateY(-1px); }
  .btn-primary:disabled { background: ${palette.border}; box-shadow: none; cursor: default; transform: none; }

  .btn-ghost { background: none; border: 1px solid ${palette.cardBorder}; border-radius: 40px; padding: 12px 32px; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 300; color: ${palette.textMid}; cursor: pointer; transition: all 0.2s; }
  .btn-ghost:hover { border-color: ${palette.accentLight}; color: ${palette.accent}; }

  .btn-deeper { background: none; border: none; font-size: 12px; letter-spacing: 0.06em; color: ${palette.accentLight}; cursor: pointer; font-family: 'Jost', sans-serif; font-weight: 300; padding: 4px 0; transition: color 0.2s; text-decoration: underline; text-underline-offset: 3px; }
  .btn-deeper:hover { color: ${palette.accent}; }

  .btn-back { background: none; border: none; font-size: 11px; letter-spacing: 0.12em; color: ${palette.accentSoft}; cursor: pointer; font-family: 'Jost', sans-serif; font-weight: 300; text-transform: uppercase; padding: 4px 0; transition: color 0.2s; }
  .btn-back:hover { color: ${palette.textMid}; }

  textarea { width: 100%; min-height: 140px; background: #fff; border: 1px solid ${palette.border}; border-radius: 14px; color: ${palette.textDark}; font-size: 15px; font-family: 'Cormorant Garamond', serif; font-weight: 300; padding: 16px 18px; resize: none; outline: none; line-height: 1.7; transition: border-color 0.25s, box-shadow 0.25s; }
  textarea:focus { border-color: ${palette.accentLight}; box-shadow: 0 0 0 3px ${palette.accentSoft}44; }
  textarea::placeholder { color: ${palette.accentSoft}; }

  .privacy-note { font-size: 11px; color: ${palette.textLight}; letter-spacing: 0.04em; text-align: center; font-style: italic; font-family: 'Cormorant Garamond', serif; }

  .breath-wrap { display: flex; flex-direction: column; align-items: center; gap: 32px; }
  .breath-outer { position: relative; display: flex; align-items: center; justify-content: center; width: 180px; height: 180px; }

  @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.22); opacity: 0.15; } 100% { transform: scale(1); opacity: 0.5; } }
  @keyframes pulse-ring-slow { 0% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.38); opacity: 0.08; } 100% { transform: scale(1); opacity: 0.3; } }

  .pulse-ring-1 { position: absolute; border-radius: 50%; border: 1px solid ${palette.accentLight}; animation: pulse-ring 2.4s ease-in-out infinite; }
  .pulse-ring-2 { position: absolute; border-radius: 50%; border: 1px solid ${palette.accentSoft}; animation: pulse-ring-slow 2.4s ease-in-out infinite 0.4s; }

  .breath-circle { border-radius: 50%; background: radial-gradient(circle at 38% 32%, #fff8ee 0%, ${palette.accentSoft} 55%, ${palette.accentLight} 100%); border: 1px solid ${palette.accentLight}; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 2px; transition: width 1.3s ease-in-out, height 1.3s ease-in-out, box-shadow 1.3s ease-in-out; position: relative; z-index: 1; }

  .breath-count { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; color: ${palette.textDark}; line-height: 1; }
  .breath-phase { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.accent}; font-weight: 400; }

  .final-icon { font-size: 34px; color: ${palette.accent}; filter: drop-shadow(0 2px 8px ${palette.accentGlow}); }
  .final-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: ${palette.textDark}; text-align: center; line-height: 1.4; }
  .final-sub { font-size: 13px; color: ${palette.textLight}; font-style: italic; font-family: 'Cormorant Garamond', serif; text-align: center; }

  .final-actions { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 8px; }

  .action-grid { display: flex; flex-direction: column; gap: 8px; width: 100%; }
  .action-card { background: #fff; border: 1px solid ${palette.border}; border-radius: 12px; padding: 14px 18px; cursor: pointer; display: flex; align-items: center; gap: 14px; text-align: left; transition: all 0.2s; font-family: 'Cormorant Garamond', serif; font-size: 15px; color: ${palette.textDark}; font-weight: 300; width: 100%; }
  .action-card:hover { border-color: ${palette.accentLight}; background: ${palette.bgCard}; box-shadow: 0 2px 12px ${palette.accentGlow}; }
  .action-emoji { font-size: 18px; }

  /* Funnel */
  .funnel { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 32px 24px; width: 100%; max-width: 360px; animation: fadeIn 0.6s ease; }
  .funnel-divider { width: 100%; display: flex; align-items: center; gap: 12px; }
  .funnel-divider-line { flex: 1; height: 1px; background: ${palette.border}; }
  .funnel-divider-text { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.textLight}; white-space: nowrap; }
  .funnel-card { background: ${palette.bgCard}; border: 1px solid ${palette.border}; border-radius: 20px; padding: 24px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }
  .funnel-card-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; color: ${palette.textDark}; line-height: 1.4; }
  .funnel-card-body { font-size: 13px; font-weight: 300; color: ${palette.textMid}; line-height: 1.7; }

  /* MailerLite overrides */
  #mlb2-38273086.ml-form-embedContainer { width: 100% !important; background: transparent !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedWrapper { background: transparent !important; border: none !important; border-radius: 0 !important; width: 100% !important; display: block !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 100%; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedBody { padding: 0 !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedContent { display: none !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-fieldRow input { background-color: #fff !important; border-color: ${palette.border} !important; border-radius: 40px !important; color: ${palette.textDark} !important; font-family: 'Jost', sans-serif !important; font-size: 13px !important; padding: 12px 18px !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-fieldRow input::placeholder { color: ${palette.accentSoft} !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedSubmit { margin: 0 !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedSubmit button.primary { background: linear-gradient(135deg, ${palette.accentLight}, ${palette.accent}) !important; border: none !important; border-radius: 40px !important; color: #fff !important; font-family: 'Jost', sans-serif !important; font-size: 13px !important; font-weight: 400 !important; letter-spacing: 0.08em !important; padding: 14px !important; box-shadow: 0 4px 16px ${palette.accentGlow} !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedSubmit button.primary:hover { background: linear-gradient(135deg, ${palette.accent}, ${palette.accentHover}) !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-successBody { padding: 0 !important; text-align: center; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-successContent p { color: ${palette.textMid} !important; font-family: 'Cormorant Garamond', serif !important; font-size: 15px !important; font-style: italic !important; text-align: center !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-successContent h4 { display: none !important; }
`;

const mailerLiteHTML = `
  <div id="mlb2-38273086" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-38273086">
    <div class="ml-form-align-center">
      <div class="ml-form-embedWrapper embedForm">
        <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
          <div class="ml-form-embedContent" style="margin-bottom: 0px;"></div>
          <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1503327/forms/181575893979760275/subscribe" data-code="" method="post" target="_blank">
            <div class="ml-form-formContent">
              <div class="ml-form-fieldRow ml-last-item">
                <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                  <input aria-label="email" aria-required="true" type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Your email address" autocomplete="email">
                </div>
              </div>
            </div>
            <input type="hidden" name="ml-submit" value="1">
            <div class="ml-form-embedSubmit">
              <button type="submit" class="primary">Send me the 5-Day Reset</button>
              <button disabled="disabled" style="display: none;" type="button" class="loading">
                <div class="ml-form-embedSubmitLoad"></div>
                <span class="sr-only">Loading...</span>
              </button>
            </div>
            <input type="hidden" name="anticsrf" value="true">
          </form>
        </div>
        <div class="ml-form-successBody row-success" style="display: none">
          <div class="ml-form-successContent">
            <p>You're in. Your first reflection is on its way. ✦</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

function MailerLiteForm() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = mailerLiteHTML;
      const script1 = document.createElement("script");
      script1.src = "https://groot.mailerlite.com/js/w/webforms.min.js?v95037e5bac78f29ed026832ca21a7c7b";
      script1.type = "text/javascript";
      ref.current.appendChild(script1);
      const script2 = document.createElement("script");
      script2.text = `
        function ml_webform_success_38273086() {
          var $ = ml_jQuery || jQuery;
          $('.ml-subscribe-form-38273086 .row-success').show();
          $('.ml-subscribe-form-38273086 .row-form').hide();
        }
        fetch("https://assets.mailerlite.com/jsonp/1503327/forms/181575893979760275/takel");
      `;
      ref.current.appendChild(script2);
    }
  }, []);
  return <div ref={ref} />;
}

function BreathingCircle({ onComplete }) {
  const [phase, setPhase] = useState("inhale");
  const [count, setCount] = useState(4);
  const phaseRef = useRef("inhale");
  const countRef = useRef(4);
  const cycleRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current -= 1;
      if (countRef.current <= 0) {
        let nextPhase;
        if (phaseRef.current === "inhale") { nextPhase = "hold"; countRef.current = 4; }
        else if (phaseRef.current === "hold") { nextPhase = "exhale"; countRef.current = 4; }
        else {
          nextPhase = "inhale"; countRef.current = 4;
          cycleRef.current += 1;
          if (cycleRef.current >= 5) { clearInterval(timer); setTimeout(onComplete, 700); return; }
        }
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
      }
      setCount(countRef.current);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const size = phase === "inhale" ? 134 : phase === "hold" ? 112 : 72;
  const glow = phase === "inhale" ? `0 0 48px ${palette.accentGlow}` : phase === "hold" ? `0 0 28px ${palette.accentGlow}` : `0 0 8px ${palette.accentGlow}`;
  const label = phase === "inhale" ? "Breathe in" : phase === "hold" ? "Hold" : "Breathe out";

  return (
    <div className="breath-wrap">
      <div className="breath-outer">
        <div className="pulse-ring-2" style={{ width: size + 44, height: size + 44 }} />
        <div className="pulse-ring-1" style={{ width: size + 22, height: size + 22 }} />
        <div className="breath-circle" style={{ width: size, height: size, boxShadow: glow }}>
          <span className="breath-count">{count}</span>
          <span className="breath-phase">{label}</span>
        </div>
      </div>
    </div>
  );
}

function FinalActions({ onHome, onDeeper }) {
  return (
    <div className="final-actions">
      <button className="btn-deeper" onClick={onDeeper}>Want to go a little deeper?</button>
      <button className="btn-back" onClick={onHome}>← back home</button>
    </div>
  );
}

function FunnelScreen({ onBack }) {
  return (
    <div className="funnel">
      <div style={{ textAlign: "center" }}>
        <p className="flow-eyebrow">A little deeper</p>
        <h2 className="flow-title" style={{ fontSize: 24 }}>There's more here,<br />whenever you're ready.</h2>
      </div>

      <div className="funnel-card">
        <p className="funnel-card-title">A gentle reset, delivered to you.</p>
        <p className="funnel-card-body">A free 5-day reflection series for women who feel overwhelmed or disconnected from themselves. One short, gentle reflection each day.</p>
        <MailerLiteForm />
      </div>

      <div className="funnel-divider">
        <div className="funnel-divider-line" />
        <span className="funnel-divider-text">also</span>
        <div className="funnel-divider-line" />
      </div>

      <div className="funnel-card">
        <p className="funnel-card-title">A quiet space to write.</p>
        <p className="funnel-card-body">A gentle journal for moments like this — when you need somewhere to land.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <a href="https://www.amazon.com/dp/B0GKP611Q9" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%" }}>Get the journal on Amazon</button>
          </a>
          <a href="https://harmonyblissnest.gumroad.com/l/udjal" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-ghost" style={{ width: "100%" }}>Download directly</button>
          </a>
        </div>
      </div>

      <div className="funnel-divider">
        <div className="funnel-divider-line" />
        <span className="funnel-divider-text">and</span>
        <div className="funnel-divider-line" />
      </div>

      <div className="funnel-card">
        <p className="funnel-card-title">Ready to come home to yourself?</p>
        <p className="funnel-card-body"><em>I Was There, But Not Really</em> — a gentle guide for women who feel present but far away.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <a href="https://www.amazon.com/dp/YOUR_ASIN_HERE" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%" }}>Get the book on Amazon</button>
          </a>
          <a href="https://naomietnel.gumroad.com/l/YOUR_GUMROAD_ID" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-ghost" style={{ width: "100%" }}>Download the ebook</button>
          </a>
        </div>
      </div>

      <button className="btn-back" onClick={onBack}>← back home</button>
      <p className="footer-tag">The Return · Naomi Etnel</p>
    </div>
  );
}

function NoSpaceFlow({ onBack, onDeeper }) {
  const [step, setStep] = useState(0);
  const actions = [
    { icon: "☕", text: "Make something for yourself" },
    { icon: "🌬️", text: "Breathe a little longer" },
    { icon: "🚪", text: "Step outside" },
    { icon: "✦", text: "Your own choice" },
  ];

  return (
    <div className="flow">
      {step === 0 && (<>
        <p className="flow-eyebrow">This moment is yours</p>
        <h2 className="flow-title">This minute is yours.<br />Not because you earned it —<br />you just needed it.</h2>
        <p className="flow-body">And that's enough. No explaining, no justifying.<br />You deserve to be here.</p>
        <button className="btn-primary" onClick={() => setStep(1)}>I'm ready</button>
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 1 && (<>
        <p className="flow-eyebrow">Let's breathe first</p>
        <p className="flow-body">Just one minute.<br />Nothing else is required of you right now.</p>
        <BreathingCircle onComplete={() => setStep(2)} />
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 2 && (<>
        <p className="flow-eyebrow">Now, something small for you</p>
        <p className="flow-body">You've taken a breath. Now do one small thing — just for you.<br />It doesn't have to be big. It just has to be yours.</p>
        <div className="action-grid">
          {actions.map((a) => (
            <button key={a.text} className="action-card" onClick={() => setStep(3)}>
              <span className="action-emoji">{a.icon}</span>{a.text}
            </button>
          ))}
        </div>
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 3 && (<>
        <span className="final-icon">✦</span>
        <h2 className="final-title">Be present for it.</h2>
        <p className="final-sub">That's The Return.</p>
        <FinalActions onHome={onBack} onDeeper={onDeeper} />
      </>)}
    </div>
  );
}

function HeadFullFlow({ onBack, onDeeper }) {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="flow">
      {step === 0 && (<>
        <p className="flow-eyebrow">Nothing more is required of you</p>
        <h2 className="flow-title">Your mind is racing.<br />That's okay.</h2>
        <p className="flow-body">You don't need to figure anything out right now.<br />Nothing is required of you in this moment.<br />Just let it out.</p>
        <button className="btn-primary" onClick={() => setStep(1)}>Let me write it out</button>
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 1 && (<>
        <p className="flow-body" style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
          Leave it here. Whatever is sitting too heavy — write it out. All of it.
        </p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Just type. No one is reading this." />
        <p className="privacy-note">What you write here is never saved or stored.<br />It disappears when you let go.</p>
        <button className="btn-primary" onClick={() => setStep(2)} disabled={!text.trim()}>Let it go</button>
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 2 && (<>
        <p className="flow-eyebrow">Now breathe it out</p>
        <p className="flow-body">You put it down.<br />Let your body follow.</p>
        <BreathingCircle onComplete={() => setStep(3)} />
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 3 && (<>
        <span className="final-icon">◈</span>
        <h2 className="final-title">You let it out<br />for a minute.</h2>
        <p className="final-sub">That counts.</p>
        <FinalActions onHome={onBack} onDeeper={onDeeper} />
      </>)}
    </div>
  );
}

function EndOfDayFlow({ onBack, onDeeper }) {
  const [step, setStep] = useState(0);
  const [gratitude, setGratitude] = useState("");
  const [thought, setThought] = useState("");

  return (
    <div className="flow">
      {step === 0 && (<>
        <p className="flow-eyebrow">Close the day gently</p>
        <h2 className="flow-title">Before you close the day,<br />find one thing.</h2>
        <p className="flow-body">It doesn't have to be beautiful or meaningful.<br />Just one moment that was there for you — however small.</p>
        <textarea value={gratitude} onChange={(e) => setGratitude(e.target.value)} placeholder="I'm grateful for..." style={{ minHeight: 100 }} />
        <button className="btn-primary" onClick={() => setStep(1)} disabled={!gratitude.trim()}>Continue</button>
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 1 && (<>
        <p className="flow-eyebrow">Carry this into the night</p>
        <h2 className="flow-title">Now choose what you<br />take with you.</h2>
        <p className="flow-body">One good thought, a feeling, or an intention for tomorrow.<br />Something quiet to hold onto while you rest.</p>
        <textarea value={thought} onChange={(e) => setThought(e.target.value)} placeholder="Tonight I choose to remember..." style={{ minHeight: 100 }} />
        <button className="btn-primary" onClick={() => setStep(2)} disabled={!thought.trim()}>Now breathe</button>
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 2 && (<>
        <p className="flow-eyebrow">Release the day</p>
        <p className="flow-body">Breathe out the day.<br />You don't need to take all of it with you.</p>
        <BreathingCircle onComplete={() => setStep(3)} />
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 3 && (<>
        <span className="final-icon">◯</span>
        <h2 className="final-title">Rest now.</h2>
        <p className="final-sub">You came back today. That's enough.</p>
        <FinalActions onHome={onBack} onDeeper={onDeeper} />
      </>)}
    </div>
  );
}

function JustBreatheFlow({ onBack, onDeeper }) {
  const [step, setStep] = useState(0);

  return (
    <div className="flow">
      {step === 0 && (<>
        <BreathingCircle onComplete={() => setStep(1)} />
        <button className="btn-back" onClick={onBack}>← back</button>
      </>)}
      {step === 1 && (<>
        <span className="final-icon">◌</span>
        <h2 className="final-title">You came back.</h2>
        <p className="final-sub">That's The Return.</p>
        <FinalActions onHome={onBack} onDeeper={onDeeper} />
      </>)}
    </div>
  );
}

const modes = [
  { id: "no-space", icon: "✦", label: "No space for me", subtitle: "I keep coming last" },
  { id: "head-full", icon: "◈", label: "Mind racing", subtitle: "I can't land anywhere" },
  { id: "end-of-day", icon: "◯", label: "End of day", subtitle: "I'm ready to let go" },
  { id: "just-breathe", icon: "◌", label: "Just breathe", subtitle: "One quiet minute, nothing more" },
];

export default function App() {
  const [selected, setSelected] = useState(null);

  const goHome = () => setSelected(null);
  const goDeeper = () => setSelected("funnel");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {!selected && (
          <div className="home">
            <div className="home-header">
              <p className="eyebrow">The Quiet Minute</p>
              <h1 className="home-title">Where are you<br />right now?</h1>
            </div>
            <div className="gold-line" />
            <div className="mode-list">
              {modes.map((m) => (
                <button key={m.id} className="mode-card" onClick={() => setSelected(m.id)}>
                  <span className="mode-icon">{m.icon}</span>
                  <div>
                    <p className="mode-label">{m.label}</p>
                    <p className="mode-sub">{m.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="footer-tag">The Return · Naomi Etnel</p>
          </div>
        )}
        {selected === "no-space" && <NoSpaceFlow onBack={goHome} onDeeper={goDeeper} />}
        {selected === "head-full" && <HeadFullFlow onBack={goHome} onDeeper={goDeeper} />}
        {selected === "end-of-day" && <EndOfDayFlow onBack={goHome} onDeeper={goDeeper} />}
        {selected === "just-breathe" && <JustBreatheFlow onBack={goHome} onDeeper={goDeeper} />}
        {selected === "funnel" && <FunnelScreen onBack={goHome} />}
      </div>
    </>
  );
}