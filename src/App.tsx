import { useState, useEffect, useRef, useContext, createContext } from "react";
import naomiImg from "./assets/naomi.jpg";
import logoImg from "./assets/logo.png";

// ─── Language ─────────────────────────────────────────────────────────────────

type Lang = "en" | "nl";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en", setLang: () => {},
});
function useLang() {
  const ctx = useContext(LangContext);
  const t = (en: string, nl: string) => ctx.lang === "en" ? en : nl;
  return { lang: ctx.lang, setLang: ctx.setLang, t };
}

// ─── Palette ──────────────────────────────────────────────────────────────────

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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  @import url("https://assets.mlcdn.com/fonts.css?version=1773928");

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${palette.bg}; font-family: 'Jost', sans-serif; color: ${palette.textDark}; -webkit-font-smoothing: antialiased; }
  #root { width: 100%; }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: ${palette.bg}E8; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid ${palette.border}55;
  }
  .nav-logo { cursor: pointer; background: none; border: none; padding: 0; line-height: 0; }
  .nav-logo img { height: 90px; width: auto; mix-blend-mode: multiply; display: block; }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-link {
    font-size: 10px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase;
    color: ${palette.textMid}; background: none; border: none;
    cursor: pointer; font-family: 'Jost', sans-serif; transition: color 0.2s;
  }
  .nav-link:hover { color: ${palette.accent}; }
  .nav-cta {
    font-size: 10px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase;
    color: #fff; background: linear-gradient(135deg, ${palette.accentLight}, ${palette.accent});
    border: none; cursor: pointer; font-family: 'Jost', sans-serif;
    padding: 9px 22px; border-radius: 40px; box-shadow: 0 2px 10px ${palette.accentGlow};
    transition: all 0.2s;
  }
  .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px ${palette.accentGlow}; }

  .lang-toggle {
    display: flex; align-items: center; gap: 4px;
    background: none; border: 1px solid ${palette.border}; border-radius: 20px;
    padding: 5px 10px; cursor: pointer; font-family: 'Jost', sans-serif;
    font-size: 9px; font-weight: 400; letter-spacing: 0.18em; transition: border-color 0.2s;
  }
  .lang-toggle:hover { border-color: ${palette.accentLight}; }
  .lang-toggle span { transition: color 0.2s; }

  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 120px 24px 100px; text-align: center; position: relative;
  }
  .hero-eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.36em; text-transform: uppercase; color: ${palette.accent}; margin-bottom: 36px; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(44px, 7vw, 80px); font-weight: 300; color: ${palette.textDark}; line-height: 1.15; max-width: 820px; margin-bottom: 32px; }
  .hero-title em { font-style: italic; color: ${palette.accent}; }
  .hero-divider { width: 40px; height: 1px; margin: 0 auto 32px; background: linear-gradient(90deg, transparent, ${palette.accentLight}, transparent); }
  .hero-sub { font-size: 16px; font-weight: 300; color: ${palette.textMid}; line-height: 1.9; max-width: 480px; margin: 0 auto 48px; }
  .hero-cta-group { display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .hero-note { font-size: 11px; color: ${palette.textLight}; font-style: italic; font-family: 'Cormorant Garamond', serif; }
  .hero-scroll {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    cursor: pointer; border: none; background: none;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: ${palette.accentSoft}; font-family: 'Jost', sans-serif; transition: color 0.2s;
  }
  .hero-scroll:hover { color: ${palette.accent}; }
  .scroll-line { width: 1px; height: 36px; background: linear-gradient(180deg, ${palette.accentSoft}, transparent); }

  .s-wrap { width: 100%; max-width: 960px; margin: 0 auto; padding: 100px 48px; }
  .s-eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.accent}; text-align: center; margin-bottom: 20px; }
  .s-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 300; color: ${palette.textDark}; line-height: 1.25; text-align: center; }
  .s-divider { width: 40px; height: 1px; margin: 36px auto; background: linear-gradient(90deg, transparent, ${palette.accentLight}, transparent); }

  .qm-band { background: ${palette.bgCard}; border-top: 1px solid ${palette.border}; border-bottom: 1px solid ${palette.border}; padding: 80px 24px; display: flex; flex-direction: column; align-items: center; }
  .qm-inner { width: 100%; max-width: 960px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .qm-sub { font-size: 15px; font-weight: 300; color: ${palette.textMid}; line-height: 1.85; max-width: 460px; text-align: center; margin-bottom: 32px; }

  .fw-body { font-size: 17px; font-weight: 300; color: ${palette.textMid}; line-height: 1.95; max-width: 600px; margin: 0 auto 60px; text-align: center; }
  .fw-body em { font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 19px; }
  .pillars { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
  .pillar { background: ${palette.bgCard}; border: 1px solid ${palette.border}; border-radius: 20px; padding: 36px 28px; flex: 1; min-width: 200px; max-width: 260px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .pillar-icon { font-size: 20px; color: ${palette.accent}; margin-bottom: 4px; }
  .pillar-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: ${palette.textDark}; }
  .pillar-body { font-size: 13px; font-weight: 300; color: ${palette.textLight}; line-height: 1.7; }

  .story-grid { display: grid; grid-template-columns: 5fr 6fr; gap: 72px; align-items: start; margin-top: 56px; }
  .story-img { width: 100%; display: block; border-radius: 2px; object-fit: cover; filter: sepia(8%) saturate(88%); }
  .story-text { display: flex; flex-direction: column; gap: 20px; padding-top: 8px; }
  .story-pull { font-family: 'Cormorant Garamond', serif; font-size: clamp(24px, 3vw, 36px); font-weight: 300; color: ${palette.textDark}; line-height: 1.3; font-style: italic; }
  .story-p { font-size: 15px; font-weight: 300; color: ${palette.textMid}; line-height: 1.9; }
  .story-sig { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.accent}; margin-top: 8px; }

  .products-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 52px; }
  .product-card { background: ${palette.bgCard}; border: 1px solid ${palette.border}; border-radius: 20px; padding: 36px 32px; display: flex; flex-direction: column; gap: 14px; }
  .product-tag { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.accentSoft}; }
  .product-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: ${palette.textDark}; line-height: 1.3; }
  .product-body { font-size: 13px; font-weight: 300; color: ${palette.textMid}; line-height: 1.75; flex: 1; }
  .product-links { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }

  .email-band { background: ${palette.textDark}; padding: 100px 48px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .em-eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.accentSoft}; margin-bottom: 20px; }
  .em-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(34px, 5vw, 60px); font-weight: 300; color: ${palette.accentSoft}; line-height: 1.2; max-width: 580px; margin-bottom: 20px; }
  .em-body { font-size: 15px; font-weight: 300; line-height: 1.85; max-width: 400px; margin-bottom: 44px; color: ${palette.accentSoft}88; }
  .em-form-wrap { width: 100%; max-width: 360px; }

  #mlb2-38273086.ml-form-embedContainer { width: 100% !important; background: transparent !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedWrapper { background: transparent !important; border: none !important; border-radius: 0 !important; width: 100% !important; display: block !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 100%; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedBody { padding: 0 !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedContent { display: none !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-fieldRow input { background-color: rgba(255,255,255,0.07) !important; border-color: ${palette.accentSoft}33 !important; border-radius: 40px !important; color: ${palette.accentSoft} !important; font-family: 'Jost', sans-serif !important; font-size: 13px !important; padding: 12px 18px !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-fieldRow input::placeholder { color: ${palette.accentSoft}55 !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedSubmit { margin: 0 !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedSubmit button.primary { background: linear-gradient(135deg, ${palette.accentLight}, ${palette.accent}) !important; border: none !important; border-radius: 40px !important; color: #fff !important; font-family: 'Jost', sans-serif !important; font-size: 13px !important; font-weight: 400 !important; letter-spacing: 0.08em !important; padding: 14px !important; box-shadow: 0 4px 16px ${palette.accentGlow} !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-embedSubmit button.primary:hover { background: linear-gradient(135deg, ${palette.accent}, ${palette.accentHover}) !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-successBody { padding: 0 !important; text-align: center; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-successContent p { color: ${palette.accentSoft} !important; font-family: 'Cormorant Garamond', serif !important; font-size: 15px !important; font-style: italic !important; text-align: center !important; }
  #mlb2-38273086.ml-form-embedContainer .ml-form-successContent h4 { display: none !important; }

  .footer { padding: 40px 48px; text-align: center; border-top: 1px solid ${palette.border}; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .footer-wordmark { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 300; font-style: italic; color: ${palette.textLight}; letter-spacing: 0.05em; }
  .footer-copy { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: ${palette.border}; }
  .footer-policy { background: none; border: none; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: ${palette.border}; cursor: pointer; font-family: 'Jost', sans-serif; transition: color 0.2s; padding: 0; }
  .footer-policy:hover { color: ${palette.textLight}; }

  .home { display: flex; flex-direction: column; align-items: center; gap: 44px; width: 100%; max-width: 360px; }
  .home-header { text-align: center; }
  .eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.accent}; margin-bottom: 16px; }
  .home-title { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 300; color: ${palette.textDark}; line-height: 1.35; }
  .gold-line { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, ${palette.accentLight}, transparent); margin: 0 auto; }
  .mode-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
  .mode-card { background: #fff; border: 1px solid ${palette.border}; border-radius: 16px; padding: 18px 22px; cursor: pointer; display: flex; align-items: center; gap: 16px; text-align: left; transition: all 0.25s ease; width: 100%; position: relative; overflow: hidden; }
  .mode-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, ${palette.accentSoft}, ${palette.accent}); opacity: 0; transition: opacity 0.25s; border-radius: 16px 0 0 16px; }
  .mode-card:hover::before { opacity: 1; }
  .mode-card:hover { background: #fffdf8; border-color: ${palette.accentLight}; transform: translateY(-1px); box-shadow: 0 6px 24px ${palette.accentGlow}; }
  .mode-icon { font-size: 16px; color: ${palette.accent}; min-width: 24px; text-align: center; }
  .mode-label { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 400; color: ${palette.textDark}; margin-bottom: 2px; }
  .mode-sub { font-size: 12px; font-weight: 300; color: ${palette.textLight}; letter-spacing: 0.03em; }
  .flow { display: flex; flex-direction: column; align-items: center; gap: 28px; padding: 24px 0; width: 100%; max-width: 360px; animation: fadeIn 0.5s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .flow-eyebrow { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.accent}; font-weight: 400; text-align: center; }
  .flow-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: ${palette.textDark}; line-height: 1.5; text-align: center; }
  .flow-body { font-size: 14px; font-weight: 300; color: ${palette.textMid}; line-height: 1.78; text-align: center; }
  .btn-primary { background: linear-gradient(135deg, ${palette.accentLight}, ${palette.accent}); color: #fff; border: none; border-radius: 40px; padding: 14px 40px; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.08em; cursor: pointer; transition: all 0.25s; box-shadow: 0 4px 16px ${palette.accentGlow}; }
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

  .nav-burger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
  .nav-burger span { display: block; width: 22px; height: 1px; background: ${palette.textMid}; transition: all 0.2s; }
  .nav-mobile {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99;
    background: ${palette.bg}F8; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 32px; animation: fadeIn 0.2s ease;
  }
  .nav-mobile .nav-link { font-size: 13px; letter-spacing: 0.2em; }
  .nav-mobile .nav-cta { font-size: 12px; padding: 12px 32px; }

  @media (max-width: 768px) {
    .nav { padding: 16px 20px; }
    .nav-links { display: none; }
    .nav-burger { display: flex; }
    .s-wrap { padding: 72px 24px; }
    .story-grid { grid-template-columns: 1fr; gap: 40px; }
    .products-grid { grid-template-columns: 1fr; }
    .email-band { padding: 72px 24px; }
    .footer { padding: 32px 24px; }
  }
`;

// ─── MailerLite Form ──────────────────────────────────────────────────────────

function makeMailerLiteHTML(placeholder: string, submitText: string, successText: string) {
  return `
  <div id="mlb2-38273086" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-38273086">
    <div class="ml-form-align-center">
      <div class="ml-form-embedWrapper embedForm">
        <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
          <div class="ml-form-embedContent" style="margin-bottom: 0px;"></div>
          <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1503327/forms/181575893979760275/subscribe" data-code="" method="post" target="_blank">
            <div class="ml-form-formContent">
              <div class="ml-form-fieldRow ml-last-item">
                <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                  <input aria-label="email" aria-required="true" type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="${placeholder}" autocomplete="email">
                </div>
              </div>
            </div>
            <input type="hidden" name="ml-submit" value="1">
            <div class="ml-form-embedSubmit">
              <button type="submit" class="primary">${submitText}</button>
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
            <p>${successText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
}

function MailerLiteForm({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const placeholder = lang === "en" ? "Your email address" : "Jouw e-mailadres";
  const submitText = lang === "en" ? "Send me the 5-Day Reset" : "Stuur me de 5-Daagse Reset";
  const successText = lang === "en"
    ? "You're in. Your first reflection is on its way. ✦"
    : "Je bent erbij. Je eerste reflectie is onderweg. ✦";

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = makeMailerLiteHTML(placeholder, submitText, successText);
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
          if (typeof gtag !== 'undefined') {
            gtag('event', 'sign_up', { method: '5-Day Reset' });
          }
        }
        fetch("https://assets.mailerlite.com/jsonp/1503327/forms/181575893979760275/takel");
      `;
      ref.current.appendChild(script2);
    }
  }, []);
  return <div ref={ref} />;
}

// ─── Breathing Circle ─────────────────────────────────────────────────────────

function BreathingCircle({ onComplete }: { onComplete: () => void }) {
  const { t } = useLang();
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
  }, [onComplete]);

  const size = phase === "inhale" ? 134 : phase === "hold" ? 112 : 72;
  const glow = phase === "inhale" ? `0 0 48px ${palette.accentGlow}` : phase === "hold" ? `0 0 28px ${palette.accentGlow}` : `0 0 8px ${palette.accentGlow}`;
  const label = phase === "inhale"
    ? t("Breathe in", "Adem in")
    : phase === "hold"
    ? t("Hold", "Vast")
    : t("Breathe out", "Adem uit");

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

// ─── Final Actions ────────────────────────────────────────────────────────────

function FinalActions({ onHome }: { onHome: () => void }) {
  const { t } = useLang();
  const goDeeper = () => document.getElementById("begin")?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="final-actions">
      <button className="btn-deeper" onClick={goDeeper}>{t("Want to go a little deeper?", "Wil je iets dieper gaan?")}</button>
      <button className="btn-back" onClick={onHome}>{t("← back home", "← terug")}</button>
    </div>
  );
}

// ─── Flows ────────────────────────────────────────────────────────────────────

function NoSpaceFlow({ onBack }: { onBack: () => void }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const actions = [
    { icon: "☕", text: t("Make something for yourself", "Maak iets voor jezelf") },
    { icon: "🌬️", text: t("Breathe a little longer", "Adem wat langer") },
    { icon: "🚪", text: t("Step outside", "Ga naar buiten") },
    { icon: "✦", text: t("Your own choice", "Jouw eigen keuze") },
  ];
  return (
    <div className="flow">
      {step === 0 && (<>
        <p className="flow-eyebrow">{t("This moment is yours", "Dit moment is van jou")}</p>
        <h2 className="flow-title">{t("This minute is yours.\nNot because you earned it —\nyou just needed it.", "Deze minuut is van jou.\nNiet omdat je hem verdiend hebt —\nje had hem gewoon nodig.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h2>
        <p className="flow-body">{t("And that's enough. No explaining, no justifying.\nYou deserve to be here.", "En dat is genoeg. Geen uitleg, geen rechtvaardiging.\nJe verdient het om hier te zijn.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <button className="btn-primary" onClick={() => setStep(1)}>{t("I'm ready", "Ik ben klaar")}</button>
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 1 && (<>
        <p className="flow-eyebrow">{t("Let's breathe first", "Laten we eerst ademen")}</p>
        <p className="flow-body">{t("Just one minute.\nNothing else is required of you right now.", "Slechts één minuut.\nEr wordt nu niets anders van je gevraagd.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <BreathingCircle onComplete={() => setStep(2)} />
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 2 && (<>
        <p className="flow-eyebrow">{t("Now, something small for you", "Nu iets kleins voor jou")}</p>
        <p className="flow-body">{t("You've taken a breath. Now do one small thing — just for you.\nIt doesn't have to be big. It just has to be yours.", "Je hebt geademd. Doe nu iets kleins — alleen voor jou.\nHet hoeft niet groot te zijn. Het moet alleen van jou zijn.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <div className="action-grid">
          {actions.map((a) => (
            <button key={a.text} className="action-card" onClick={() => setStep(3)}>
              <span className="action-emoji">{a.icon}</span>{a.text}
            </button>
          ))}
        </div>
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 3 && (<>
        <span className="final-icon">✦</span>
        <h2 className="final-title">{t("Be present for it.", "Wees er aanwezig voor.")}</h2>
        <p className="final-sub">{t("That's The Return.", "Dat is The Return.")}</p>
        <FinalActions onHome={onBack} />
      </>)}
    </div>
  );
}

function HeadFullFlow({ onBack }: { onBack: () => void }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  return (
    <div className="flow">
      {step === 0 && (<>
        <p className="flow-eyebrow">{t("Nothing more is required of you", "Er wordt niets meer van je gevraagd")}</p>
        <h2 className="flow-title">{t("Your mind is racing.\nThat's okay.", "Je gedachten razen.\nDat is oké.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h2>
        <p className="flow-body">{t("You don't need to figure anything out right now.\nNothing is required of you in this moment.\nJust let it out.", "Je hoeft nu niets uit te zoeken.\nEr wordt niets van je gevraagd in dit moment.\nLaat het er gewoon uit.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <button className="btn-primary" onClick={() => setStep(1)}>{t("Let me write it out", "Laat me het opschrijven")}</button>
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 1 && (<>
        <p className="flow-body" style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
          {t("Leave it here. Whatever is sitting too heavy — write it out. All of it.", "Laat het hier achter. Wat er ook te zwaar is — schrijf het op. Alles.")}
        </p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("Just type. No one is reading this.", "Typ maar. Niemand leest dit.")} />
        <p className="privacy-note">{t("What you write here is never saved or stored.\nIt disappears when you let go.", "Wat je hier schrijft wordt nooit opgeslagen.\nHet verdwijnt wanneer je loslaat.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <button className="btn-primary" onClick={() => setStep(2)} disabled={!text.trim()}>{t("Let it go", "Laat het los")}</button>
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 2 && (<>
        <p className="flow-eyebrow">{t("Now breathe it out", "Adem het nu uit")}</p>
        <p className="flow-body">{t("You put it down.\nLet your body follow.", "Je hebt het neergelegd.\nLaat je lichaam volgen.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <BreathingCircle onComplete={() => setStep(3)} />
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 3 && (<>
        <span className="final-icon">◈</span>
        <h2 className="final-title">{t("You let it out\nfor a minute.", "Je hebt het even\nlosgelaten.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h2>
        <p className="final-sub">{t("That counts.", "Dat telt.")}</p>
        <FinalActions onHome={onBack} />
      </>)}
    </div>
  );
}

function EndOfDayFlow({ onBack }: { onBack: () => void }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [gratitude, setGratitude] = useState("");
  const [thought, setThought] = useState("");
  return (
    <div className="flow">
      {step === 0 && (<>
        <p className="flow-eyebrow">{t("Close the day gently", "Sluit de dag zacht af")}</p>
        <h2 className="flow-title">{t("Before you close the day,\nfind one thing.", "Voordat je de dag afsluit,\nvind één ding.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h2>
        <p className="flow-body">{t("It doesn't have to be beautiful or meaningful.\nJust one moment that was there for you — however small.", "Het hoeft niet mooi of betekenisvol te zijn.\nSlechts één moment dat er voor jou was — hoe klein ook.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <textarea value={gratitude} onChange={(e) => setGratitude(e.target.value)} placeholder={t("I'm grateful for...", "Ik ben dankbaar voor...")} style={{ minHeight: 100 }} />
        <button className="btn-primary" onClick={() => setStep(1)} disabled={!gratitude.trim()}>{t("Continue", "Verder")}</button>
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 1 && (<>
        <p className="flow-eyebrow">{t("Carry this into the night", "Neem dit mee de nacht in")}</p>
        <h2 className="flow-title">{t("Now choose what you\ntake with you.", "Kies nu wat je\nmeeneemt.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h2>
        <p className="flow-body">{t("One good thought, a feeling, or an intention for tomorrow.\nSomething quiet to hold onto while you rest.", "Eén goede gedachte, een gevoel, of een intentie voor morgen.\nIets stils om vast te houden terwijl je rust.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <textarea value={thought} onChange={(e) => setThought(e.target.value)} placeholder={t("Tonight I choose to remember...", "Vanavond kies ik om te onthouden...")} style={{ minHeight: 100 }} />
        <button className="btn-primary" onClick={() => setStep(2)} disabled={!thought.trim()}>{t("Now breathe", "Adem nu")}</button>
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 2 && (<>
        <p className="flow-eyebrow">{t("Release the day", "Laat de dag los")}</p>
        <p className="flow-body">{t("Breathe out the day.\nYou don't need to take all of it with you.", "Adem de dag uit.\nJe hoeft niet alles mee te nemen.").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <BreathingCircle onComplete={() => setStep(3)} />
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 3 && (<>
        <span className="final-icon">◯</span>
        <h2 className="final-title">{t("Rest now.", "Rust nu.")}</h2>
        <p className="final-sub">{t("You came back today. That's enough.", "Je bent vandaag teruggekomen. Dat is genoeg.")}</p>
        <FinalActions onHome={onBack} />
      </>)}
    </div>
  );
}

function JustBreatheFlow({ onBack }: { onBack: () => void }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  return (
    <div className="flow">
      {step === 0 && (<>
        <BreathingCircle onComplete={() => setStep(1)} />
        <button className="btn-back" onClick={onBack}>{t("← back", "← terug")}</button>
      </>)}
      {step === 1 && (<>
        <span className="final-icon">◌</span>
        <h2 className="final-title">{t("You came back.", "Je bent teruggekomen.")}</h2>
        <p className="final-sub">{t("That's The Return.", "Dat is The Return.")}</p>
        <FinalActions onHome={onBack} />
      </>)}
    </div>
  );
}

// ─── Quiet Minute Tool ────────────────────────────────────────────────────────

function QuietMinuteTool() {
  const { t } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const goHome = () => setSelected(null);

  const modes = [
    { id: "no-space", icon: "✦", label: t("No space for me", "Geen ruimte voor mezelf"), subtitle: t("I keep coming last", "Ik kom altijd op de laatste plek") },
    { id: "head-full", icon: "◈", label: t("Mind racing", "Hoofd vol"), subtitle: t("I can't land anywhere", "Ik kan nergens landen") },
    { id: "end-of-day", icon: "◯", label: t("End of day", "Einde van de dag"), subtitle: t("I'm ready to let go", "Ik ben klaar om los te laten") },
    { id: "just-breathe", icon: "◌", label: t("Just breathe", "Gewoon ademen"), subtitle: t("One quiet minute, nothing more", "Eén stil moment, niets meer") },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 20px", width: "100%", maxWidth: 380 }}>
      {!selected && (
        <div className="home">
          <div className="home-header">
            <p className="eyebrow">The Quiet Minute</p>
            <h2 className="home-title">{t("Where are you\nright now?", "Waar ben je\nnu?").split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h2>
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
        </div>
      )}
      {selected === "no-space" && <NoSpaceFlow onBack={goHome} />}
      {selected === "head-full" && <HeadFullFlow onBack={goHome} />}
      {selected === "end-of-day" && <EndOfDayFlow onBack={goHome} />}
      {selected === "just-breathe" && <JustBreatheFlow onBack={goHome} />}
    </div>
  );
}

// ─── Lang Toggle ──────────────────────────────────────────────────────────────

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button className="lang-toggle" onClick={() => setLang(lang === "en" ? "nl" : "en")} aria-label="Switch language">
      <span style={{ color: lang === "en" ? palette.accent : palette.textLight }}>EN</span>
      <span style={{ color: palette.border, margin: "0 2px" }}>·</span>
      <span style={{ color: lang === "nl" ? palette.accent : palette.textLight }}>NL</span>
    </button>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <>
      <nav className="nav">
        <button className="nav-logo" onClick={() => scrollTo("home")}>
          <img src={logoImg} alt="Naomi Etnel" />
        </button>
        <div className="nav-links">
          <button className="nav-link" onClick={() => scrollTo("story")}>{t("My Story", "Mijn Verhaal")}</button>
          <button className="nav-link" onClick={() => scrollTo("framework")}>The Return</button>
          <button className="nav-link" onClick={() => scrollTo("products")}>{t("Products", "Producten")}</button>
          <button className="nav-link" onClick={() => scrollTo("try")}>The Quiet Minute</button>
          <LangToggle />
          <button className="nav-cta" onClick={() => scrollTo("begin")}>{t("Begin", "Begin")}</button>
        </div>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      {open && (
        <div className="nav-mobile">
          <button className="nav-link" onClick={() => scrollTo("story")}>{t("My Story", "Mijn Verhaal")}</button>
          <button className="nav-link" onClick={() => scrollTo("framework")}>The Return</button>
          <button className="nav-link" onClick={() => scrollTo("products")}>{t("Products", "Producten")}</button>
          <button className="nav-link" onClick={() => scrollTo("try")}>The Quiet Minute</button>
          <LangToggle />
          <button className="nav-cta" onClick={() => scrollTo("begin")}>{t("Begin", "Begin")}</button>
        </div>
      )}
    </>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang, t } = useLang();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" className="hero">
      <p className="hero-eyebrow">{t("A practice of coming home", "De oefening van thuiskomen")}</p>
      {lang === "en" ? (
        <h1 className="hero-title">
          You've spent years trying to fit in a world that wasn't built for you.
          It's time to come home
          <em style={{ display: "block" }}>to yourself.</em>
        </h1>
      ) : (
        <h1 className="hero-title">
          Je hebt jaren geprobeerd jezelf te passen in een wereld die niet voor jou gemaakt was.
          Het is tijd om thuis te komen
          <em style={{ display: "block" }}>bij jezelf.</em>
        </h1>
      )}
      <div className="hero-divider" />
      <p className="hero-sub">
        {t(
          "For women who always felt out of place. The Return is the practice of coming home to yourself — one quiet moment at a time.",
          "Voor vrouwen die zich altijd niet op hun plek voelden. The Return is de oefening van thuiskomen bij jezelf — één stil moment tegelijk."
        )}
      </p>
      <div className="hero-cta-group">
        <button className="btn-primary" onClick={() => scrollTo("begin")}>
          {t("Join the free 5-Day Reset", "Begin aan de gratis 5-Daagse Reset")}
        </button>
        <p className="hero-note">{t("Five days · Five ordinary moments · Completely yours", "Vijf dagen · Vijf gewone momenten · Helemaal van jou")}</p>
      </div>
      <button className="hero-scroll" onClick={() => scrollTo("story")}>
        <span className="scroll-line" />
        {t("Begin", "Begin")}
      </button>
    </section>
  );
}

function QuietMinuteSection() {
  const { t } = useLang();
  return (
    <section id="try" className="qm-band">
      <div className="qm-inner">
        <div style={{ textAlign: "center" }}>
          <p className="s-eyebrow">The Quiet Minute</p>
          <h2 className="s-title">{t("One quiet minute.\nThat's all this is.", "Eén stil moment.\nMeer is het niet.").split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
          <p className="qm-sub">{t("Choose where you are right now and let yourself be led back — just for a moment. No sign-up, no commitment.", "Kies waar je nu bent en laat jezelf voor een moment teruggeleid worden. Geen aanmelding, geen verplichtingen.")}</p>
        </div>
        <QuietMinuteTool />
      </div>
    </section>
  );
}

function FrameworkSection() {
  const { lang, t } = useLang();
  return (
    <section id="framework">
      <div className="s-wrap">
        <p className="s-eyebrow">The Return</p>
        <h2 className="s-title">{t("What is The Return?", "Wat is The Return?")}</h2>
        <div className="s-divider" />
        {lang === "en" ? (
          <p className="fw-body">
            You drift. That's not a flaw — <em>it's human.</em>
            <br /><br />
            Life demands your attention in a thousand directions.
            The kids. The job. The worry. The scroll.
            The weight of everyone else's needs.
            And somewhere in all of it, you disappear.
            <br /><br />
            The Return is the practice of noticing when you've drifted —
            and coming back. Without drama, without judgment.
            Just a gentle: <em>oh, I'm here again.</em>
            <br /><br />
            Not in the big breakthrough moments.
            In the sunlight on your face.
            In the taste of your morning coffee.
            In the water of your shower.
            In the sound of your own breathing.
            <br /><br />
            Over time, the drifts get shorter. The returns get softer.
            You spend less time in survival mode
            and more time actually <em>living</em> your life.
            <br /><br />
            For women who have spent years away from themselves — this is the way back.
          </p>
        ) : (
          <p className="fw-body">
            Je dwaalt af. Dat is geen gebrek — <em>het is menselijk.</em>
            <br /><br />
            Het leven vraagt je aandacht in duizend richtingen.
            De kinderen. Het werk. De zorgen. Het scrollen.
            Het gewicht van andermans behoeften.
            En ergens daarin verdwijn je.
            <br /><br />
            The Return is de oefening van opmerken wanneer je bent afgedwaald —
            en terugkomen. Zonder drama, zonder oordeel.
            Gewoon een zacht: <em>oh, ik ben er weer.</em>
            <br /><br />
            Niet in de grote doorbraaksmomenten.
            In het zonlicht op je gezicht.
            In de smaak van je ochtendkoffie.
            In het water van je douche.
            In het geluid van je eigen adem.
            <br /><br />
            Na verloop van tijd worden de afdwalingen korter. De terugkeren zachter.
            Je brengt minder tijd door in overlevingsmodus
            en meer tijd in het werkelijk <em>leven</em> van je leven.
            <br /><br />
            Voor vrouwen die jaren ver van zichzelf hebben doorgebracht — dit is de weg terug.
          </p>
        )}
        <div className="pillars">
          <div className="pillar">
            <span className="pillar-icon">✦</span>
            <p className="pillar-name">{t("Notice", "Merk op")}</p>
            <p className="pillar-body">{t("You drifted. That's not a failure — that's human. See it, without judgment.", "Je bent afgedwaald. Dat is geen falen — dat is menselijk. Zie het, zonder oordeel.")}</p>
          </div>
          <div className="pillar">
            <span className="pillar-icon">◈</span>
            <p className="pillar-name">{t("Return", "Terugkeer")}</p>
            <p className="pillar-body">{t("Come back. To this moment. To this body. To this breath. Without drama.", "Kom terug. Naar dit moment. Naar dit lichaam. Naar deze adem. Zonder drama.")}</p>
          </div>
          <div className="pillar">
            <span className="pillar-icon">◯</span>
            <p className="pillar-name">{t("Stay", "Blijf")}</p>
            <p className="pillar-body">{t("Be present for the ordinary moment in front of you. That's where life actually is.", "Wees aanwezig in het gewone moment voor je. Daar is het echte leven.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const { lang, t } = useLang();
  return (
    <section id="story" style={{ background: palette.bgCard, borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
      <div className="s-wrap">
        <p className="s-eyebrow">{t("My Story", "Mijn Verhaal")}</p>
        <div className="story-grid">
          <img src={naomiImg} alt="Naomi Etnel" className="story-img" />
          <div className="story-text">
            <p className="story-pull">{t('"What I had always been searching for was myself."', '"Waar ik altijd naar zocht, bleek mezelf te zijn."')}</p>
            {lang === "en" ? (<>
              <p className="story-p">For most of my life, I didn't know who I was.</p>
              <p className="story-p">I'm a highly sensitive, multipassionate creative. For years, I thought that was the problem. I couldn't settle, couldn't decide, couldn't figure out what I wanted. I judged myself endlessly for it.</p>
              <p className="story-p">I always knew there was more to me. More to life. But I approached the world differently, never quite fit anywhere, and spent years searching for a place to belong — without realizing I was looking in the wrong direction.</p>
              <p className="story-p">When I became a mother, I went even deeper into survival mode. Running on empty. Showing up for everyone except myself. I didn't even know that's what it was called.</p>
              <p className="story-p">Then, a few years ago, something shifted. I started practicing The Return — those small, deliberate moments of coming back. The morning coffee. The warmth of water in the shower. My children's faces.</p>
              <p className="story-p">Slowly, I started waking up. I started knowing myself. Loving myself.</p>
              <p className="story-p">And I finally understood: what I'd been searching for all along was myself.</p>
              <p className="story-p">And now I'm here for the women who recognize this feeling. The ones who always felt like they were too much, or not enough, or simply somewhere in between. The ones who spent years searching for a place to belong — without realizing the place they were looking for was themselves.</p>
              <p className="story-p">This is where we come home.</p>
            </>) : (<>
              <p className="story-p">Het grootste deel van mijn leven wist ik niet wie ik was.</p>
              <p className="story-p">Ik ben een hoogsensitieve, multigepassioneerde creatieveling. Jarenlang dacht ik dat dat het probleem was. Ik kon me niet settelen, niet beslissen, niet bedenken wat ik wilde. Ik oordeelde mezelf er eindeloos voor.</p>
              <p className="story-p">Ik wist altijd dat er meer in mij zat. Meer in het leven. Maar ik benaderde de wereld anders, paste nergens echt, en bracht jaren door met zoeken naar een plek om bij te horen — zonder te beseffen dat ik in de verkeerde richting zocht.</p>
              <p className="story-p">Toen ik moeder werd, ging ik nog dieper de overlevingsmodus in. Op reserves draaien. Er zijn voor iedereen behalve mezelf. Ik wist niet eens dat dat zo heette.</p>
              <p className="story-p">Toen, een paar jaar geleden, veranderde er iets. Ik begon The Return te beoefenen — die kleine, bewuste momenten van terugkomen. De ochtendkoffie. De warmte van water in de douche. De gezichten van mijn kinderen.</p>
              <p className="story-p">Langzaam begon ik wakker te worden. Ik begon mezelf te kennen. Mezelf lief te hebben.</p>
              <p className="story-p">En ik begreep eindelijk: wat ik de hele tijd had gezocht, was mezelf.</p>
              <p className="story-p">En nu ben ik hier voor de vrouwen die dit gevoel herkennen. De vrouwen die altijd het gevoel hadden te veel te zijn, of niet genoeg, of gewoon ergens daartussenin. De vrouwen die jaren zochten naar een plek om bij te horen — zonder te beseffen dat de plek die ze zochten, zijzelf waren.</p>
              <p className="story-p">Hier komen we thuis.</p>
            </>)}
            <p className="story-sig">— Naomi</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const { t } = useLang();
  return (
    <section id="products">
      <div className="s-wrap">
        <p className="s-eyebrow">{t("Go Deeper", "Ga Dieper")}</p>
        <h2 className="s-title">{t("Ways to keep returning.", "Manieren om te blijven terugkeren.")}</h2>
        <div className="s-divider" />
        <div className="products-grid">
          <div className="product-card">
            <p className="product-tag">{t("Journal", "Dagboek")}</p>
            <p className="product-title">When Everything Feels Like Too Much</p>
            <p className="product-body">{t("A low-pressure journal designed to come back to whenever you need it — no rules, no routine required. Just a quiet place to land.", "Een dagboek zonder druk, om op terug te vallen wanneer je het nodig hebt — geen regels, geen routine vereist. Gewoon een stille plek om te landen.")}</p>
            <div className="product-links">
              <a href="https://www.amazon.com/dp/B0GKP611Q9" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ width: "100%" }}>{t("Get it on Amazon", "Koop op Amazon")}</button>
              </a>
              <a href="https://harmonyblissnest.gumroad.com/l/udjal" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-ghost" style={{ width: "100%" }}>{t("Download directly", "Direct downloaden")}</button>
              </a>
            </div>
          </div>
          <div className="product-card">
            <p className="product-tag">{t("Book", "Boek")}</p>
            <p className="product-title">I Was There, But Not Really</p>
            <p className="product-body">{t("Written for mothers — but recognized by every woman who has ever felt lost inside her own life.", "Geschreven voor moeders — maar herkend door elke vrouw die zich ooit verloren heeft gevoeld in haar eigen leven.")}</p>
            <div className="product-links">
              <a href="https://www.amazon.com/dp/B0GWX2CQ8G" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ width: "100%" }}>{t("Get it on Amazon", "Koop op Amazon")}</button>
              </a>
              <a href="https://harmonyblissnest.gumroad.com/l/ucufv" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-ghost" style={{ width: "100%" }}>{t("Download the ebook", "Download het eboek")}</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailSection() {
  const { lang, t } = useLang();
  return (
    <section id="begin" className="email-band">
      <p className="em-eyebrow">{t("Begin", "Begin")}</p>
      <h2 className="em-title">
        {t("Five days.", "Vijf dagen.")}<br />
        {t("Five ordinary moments.", "Vijf gewone momenten.")}<br />
        {t("All yours.", "Allemaal van jou.")}
      </h2>
      <p className="em-body">
        {t(
          "The 5-Day Return Reset — a free email series for women who have lost themselves along the way. Come back to yourself, one quiet moment at a time. Two minutes a day. No pressure, no programs.",
          "De 5-Daagse Return Reset — een gratis e-mailserie voor vrouwen die zichzelf onderweg kwijt zijn geraakt. Kom terug naar jezelf, één stil moment tegelijk. Twee minuten per dag. Geen druk, geen programma's."
        )}
      </p>
      <div className="em-form-wrap">
        <MailerLiteForm key={lang} lang={lang} />
      </div>
    </section>
  );
}

function SiteFooter({ onPrivacy }: { onPrivacy: () => void }) {
  const { t } = useLang();
  return (
    <footer className="footer">
      <p className="footer-wordmark">The Return · Naomi Etnel</p>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <p className="footer-copy">{t("© 2026 · All rights reserved", "© 2026 · Alle rechten voorbehouden")}</p>
        <a href="mailto:hello@naomietnel.com" className="footer-policy">{t("Contact", "Contact")}</a>
        <button onClick={onPrivacy} className="footer-policy">{t("Privacy Policy", "Privacybeleid")}</button>
      </div>
      <p className="footer-copy">KVK 42083997</p>
    </footer>
  );
}

// ─── Privacy Policy ───────────────────────────────────────────────────────────

function PrivacyPolicy({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();

  const enSections = [
    {
      heading: "Who we are",
      body: `This website is operated by Naomi Etnel ("I", "me", "my"). I am the data controller for any personal information collected through this site.\n\nTo contact me regarding your data, please email: hello@naomietnel.com`,
    },
    {
      heading: "What information I collect",
      body: `I collect your email address when you voluntarily subscribe to the 5-Day Return Reset email series through the form on this site.\n\nI do not collect any other personal data. I do not use analytics tools, advertising trackers, or profiling of any kind.`,
    },
    {
      heading: "Why I collect it — and the legal basis",
      body: `Your email address is used solely to send you the 5-Day Return Reset series and occasional related updates that you have requested.\n\nThe legal basis for this processing is your consent (Article 6(1)(a) GDPR), given when you submit the subscription form. You may withdraw your consent at any time.`,
    },
    {
      heading: "How long I keep your data",
      body: `I keep your email address for as long as you remain subscribed. You can unsubscribe at any time using the unsubscribe link included in every email I send you. Once you unsubscribe, your data is deleted from my list.`,
    },
    {
      heading: "Who I share your data with",
      body: `Your email address is stored and processed by MailerLite (UAB "MailerLite", J. Jasinskio 16B, Vilnius 03163, Lithuania) — my email marketing provider. MailerLite is based in the EU and processes data in compliance with the GDPR under a Data Processing Agreement.\n\nI do not sell, rent, or share your personal data with any other third parties.`,
    },
    {
      heading: "Your rights under the GDPR",
      body: `You have the right to:\n\n· Access the personal data I hold about you\n· Rectify any inaccurate data\n· Erase your data ("right to be forgotten")\n· Restrict or object to processing\n· Data portability — receive your data in a machine-readable format\n· Withdraw your consent at any time\n\nTo exercise any of these rights, please contact me at hello@naomietnel.com. I will respond within 30 days.`,
    },
    {
      heading: "Right to lodge a complaint",
      body: `If you believe I have not handled your personal data correctly, you have the right to lodge a complaint with your national data protection authority. In the Netherlands this is the Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl). In the UK it is the Information Commissioner's Office (ico.org.uk).`,
    },
    {
      heading: "Changes to this policy",
      body: `I may update this policy from time to time. The "last updated" date at the top of this page reflects the most recent changes. Continued use of this site after any changes constitutes your acceptance of the updated policy.`,
    },
  ];

  const nlSections = [
    {
      heading: "Wie wij zijn",
      body: `Deze website wordt beheerd door Naomi Etnel ("ik", "mij", "mijn"). Ik ben de verwerkingsverantwoordelijke voor persoonlijke gegevens die via deze site worden verzameld.\n\nNeem voor vragen over uw gegevens contact met mij op via: hello@naomietnel.com`,
    },
    {
      heading: "Welke gegevens ik verzamel",
      body: `Ik verzamel uw e-mailadres wanneer u zich vrijwillig aanmeldt voor de 5-Daagse Return Reset via het formulier op deze site.\n\nIk verzamel geen andere persoonlijke gegevens. Ik gebruik geen analysetools, advertentietrackers of profilering van welke aard dan ook.`,
    },
    {
      heading: "Waarom ik gegevens verzamel — en de rechtsgrond",
      body: `Uw e-mailadres wordt uitsluitend gebruikt om u de 5-Daagse Return Reset-serie te sturen en af en toe gerelateerde updates die u heeft aangevraagd.\n\nDe rechtsgrond voor deze verwerking is uw toestemming (artikel 6(1)(a) AVG), gegeven op het moment dat u het aanmeldingsformulier invult. U kunt uw toestemming op elk moment intrekken.`,
    },
    {
      heading: "Hoe lang ik uw gegevens bewaar",
      body: `Ik bewaar uw e-mailadres zolang u ingeschreven bent. U kunt zich op elk moment uitschrijven via de uitschrijflink in elke e-mail die ik u stuur. Na uitschrijving worden uw gegevens van mijn lijst verwijderd.`,
    },
    {
      heading: "Met wie ik uw gegevens deel",
      body: `Uw e-mailadres wordt opgeslagen en verwerkt door MailerLite (UAB "MailerLite", J. Jasinskio 16B, Vilnius 03163, Litouwen) — mijn e-mailmarketingprovider. MailerLite is gevestigd in de EU en verwerkt gegevens in overeenstemming met de AVG.\n\nIk verkoop, verhuur of deel uw persoonlijke gegevens niet met andere derden.`,
    },
    {
      heading: "Uw rechten onder de AVG",
      body: `U heeft het recht om:\n\n· Inzage te krijgen in de persoonlijke gegevens die ik over u bewaar\n· Onjuiste gegevens te laten corrigeren\n· Uw gegevens te laten wissen ("recht op vergetelheid")\n· De verwerking te beperken of er bezwaar tegen te maken\n· Gegevensoverdraagbaarheid — uw gegevens in een machineleesbaar formaat te ontvangen\n· Uw toestemming op elk moment in te trekken\n\nNeem voor de uitoefening van deze rechten contact op via hello@naomietnel.com. Ik reageer binnen 30 dagen.`,
    },
    {
      heading: "Recht op het indienen van een klacht",
      body: `Als u van mening bent dat ik uw persoonlijke gegevens niet correct heb behandeld, kunt u een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).`,
    },
    {
      heading: "Wijzigingen in dit beleid",
      body: `Ik kan dit beleid van tijd tot tijd bijwerken. De datum bovenaan deze pagina geeft de meest recente wijzigingen weer. Voortgezet gebruik van deze site na wijzigingen houdt acceptatie van het bijgewerkte beleid in.`,
    },
  ];

  const sections = lang === "en" ? enSections : nlSections;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: palette.bg, overflowY: "auto",
      padding: "80px 48px 80px", animation: "fadeIn 0.3s ease",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
        <button onClick={onClose} className="btn-back" style={{ alignSelf: "flex-start" }}>{t("← Back to site", "← Terug naar de site")}</button>
        <div>
          <p className="s-eyebrow" style={{ textAlign: "left" }}>{t("Legal", "Juridisch")}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: palette.textDark, lineHeight: 1.2, marginTop: 8 }}>{t("Privacy Policy", "Privacybeleid")}</h1>
          <p style={{ fontSize: 12, color: palette.textLight, marginTop: 8, letterSpacing: "0.04em" }}>{t("Last updated: June 2025", "Laatst bijgewerkt: juni 2025")}</p>
        </div>
        {sections.map(({ heading, body }) => (
          <div key={heading} style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 28 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: palette.textDark, marginBottom: 12 }}>{heading}</p>
            {body.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: 15, fontWeight: 300, color: palette.textMid, lineHeight: 1.85, marginBottom: 12, whiteSpace: "pre-line" }}>{para}</p>
            ))}
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 32, marginTop: 8 }}>
          <button onClick={onClose} className="btn-ghost">{t("← Back to site", "← Terug naar de site")}</button>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <style>{css}</style>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Nav />
        <HeroSection />
        <StorySection />
        <FrameworkSection />
        <ProductsSection />
        <EmailSection />
        <QuietMinuteSection />
        <SiteFooter onPrivacy={() => setShowPrivacy(true)} />
      </div>
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </LangContext.Provider>
  );
}
