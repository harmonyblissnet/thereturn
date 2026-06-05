import { useState, useEffect, useRef } from "react";
import naomiImg from "./assets/naomi.jpg";
import logoImg from "./assets/logo.png";

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
  .nav-logo {
    cursor: pointer; background: none; border: none; padding: 0; line-height: 0;
  }
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

  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 120px 24px 100px; text-align: center; position: relative;
  }
  .hero-eyebrow {
    font-size: 10px; font-weight: 400; letter-spacing: 0.36em; text-transform: uppercase;
    color: ${palette.accent}; margin-bottom: 36px;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(44px, 7vw, 80px);
    font-weight: 300; color: ${palette.textDark}; line-height: 1.15;
    max-width: 820px; margin-bottom: 32px;
  }
  .hero-title em { font-style: italic; color: ${palette.accent}; }
  .hero-divider {
    width: 40px; height: 1px; margin: 0 auto 32px;
    background: linear-gradient(90deg, transparent, ${palette.accentLight}, transparent);
  }
  .hero-sub {
    font-size: 16px; font-weight: 300; color: ${palette.textMid};
    line-height: 1.9; max-width: 480px; margin: 0 auto 48px;
  }
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
  .s-eyebrow {
    font-size: 10px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase;
    color: ${palette.accent}; text-align: center; margin-bottom: 20px;
  }
  .s-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 300; color: ${palette.textDark}; line-height: 1.25; text-align: center;
  }
  .s-divider {
    width: 40px; height: 1px; margin: 36px auto;
    background: linear-gradient(90deg, transparent, ${palette.accentLight}, transparent);
  }

  .qm-band {
    background: ${palette.bgCard};
    border-top: 1px solid ${palette.border}; border-bottom: 1px solid ${palette.border};
    padding: 80px 24px; display: flex; flex-direction: column; align-items: center;
  }
  .qm-inner { width: 100%; max-width: 960px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .qm-sub {
    font-size: 15px; font-weight: 300; color: ${palette.textMid};
    line-height: 1.85; max-width: 460px; text-align: center; margin-bottom: 32px;
  }

  .fw-body {
    font-size: 17px; font-weight: 300; color: ${palette.textMid};
    line-height: 1.95; max-width: 600px; margin: 0 auto 60px; text-align: center;
  }
  .fw-body em { font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 19px; }
  .pillars { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
  .pillar {
    background: ${palette.bgCard}; border: 1px solid ${palette.border}; border-radius: 20px;
    padding: 36px 28px; flex: 1; min-width: 200px; max-width: 260px;
    text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;
  }
  .pillar-icon { font-size: 20px; color: ${palette.accent}; margin-bottom: 4px; }
  .pillar-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: ${palette.textDark}; }
  .pillar-body { font-size: 13px; font-weight: 300; color: ${palette.textLight}; line-height: 1.7; }

  .story-grid { display: grid; grid-template-columns: 5fr 6fr; gap: 72px; align-items: start; margin-top: 56px; }
  .story-img { width: 100%; display: block; border-radius: 2px; object-fit: cover; filter: sepia(8%) saturate(88%); }
  .story-text { display: flex; flex-direction: column; gap: 20px; padding-top: 8px; }
  .story-pull {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 300; color: ${palette.textDark}; line-height: 1.3; font-style: italic;
  }
  .story-p { font-size: 15px; font-weight: 300; color: ${palette.textMid}; line-height: 1.9; }
  .story-sig { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.accent}; margin-top: 8px; }

  .products-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 52px; }
  .product-card {
    background: ${palette.bgCard}; border: 1px solid ${palette.border};
    border-radius: 20px; padding: 36px 32px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .product-tag { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.accentSoft}; }
  .product-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: ${palette.textDark}; line-height: 1.3; }
  .product-body { font-size: 13px; font-weight: 300; color: ${palette.textMid}; line-height: 1.75; flex: 1; }
  .product-links { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }

  .email-band {
    background: ${palette.textDark}; padding: 100px 48px;
    display: flex; flex-direction: column; align-items: center; text-align: center;
  }
  .em-eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.accentSoft}; margin-bottom: 20px; }
  .em-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(34px, 5vw, 60px);
    font-weight: 300; color: ${palette.accentSoft}; line-height: 1.2;
    max-width: 580px; margin-bottom: 20px;
  }
  .em-body {
    font-size: 15px; font-weight: 300; line-height: 1.85;
    max-width: 400px; margin-bottom: 44px;
    color: ${palette.accentSoft}88;
  }
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

  .footer {
    padding: 40px 48px; text-align: center;
    border-top: 1px solid ${palette.border};
    display: flex; flex-direction: column; align-items: center; gap: 10px;
  }
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

  .nav-burger {
    display: none; background: none; border: none; cursor: pointer;
    flex-direction: column; gap: 5px; padding: 4px;
  }
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
  const ref = useRef<HTMLDivElement>(null);
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

function BreathingCircle({ onComplete }: { onComplete: () => void }) {
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

function FinalActions({ onHome }: { onHome: () => void }) {
  const goDeeper = () => document.getElementById("begin")?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="final-actions">
      <button className="btn-deeper" onClick={goDeeper}>Want to go a little deeper?</button>
      <button className="btn-back" onClick={onHome}>← back home</button>
    </div>
  );
}

function NoSpaceFlow({ onBack }: { onBack: () => void }) {
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
        <FinalActions onHome={onBack} />
      </>)}
    </div>
  );
}

function HeadFullFlow({ onBack }: { onBack: () => void }) {
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
        <FinalActions onHome={onBack} />
      </>)}
    </div>
  );
}

function EndOfDayFlow({ onBack }: { onBack: () => void }) {
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
        <FinalActions onHome={onBack} />
      </>)}
    </div>
  );
}

function JustBreatheFlow({ onBack }: { onBack: () => void }) {
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
        <FinalActions onHome={onBack} />
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

function QuietMinuteTool() {
  const [selected, setSelected] = useState<string | null>(null);
  const goHome = () => setSelected(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 20px", width: "100%", maxWidth: 380 }}>
      {!selected && (
        <div className="home">
          <div className="home-header">
            <p className="eyebrow">The Quiet Minute</p>
            <h2 className="home-title">Where are you<br />right now?</h2>
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

function Nav() {
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
          <button className="nav-link" onClick={() => scrollTo("story")}>My Story</button>
          <button className="nav-link" onClick={() => scrollTo("framework")}>The Return</button>
          <button className="nav-link" onClick={() => scrollTo("products")}>Products</button>
          <button className="nav-link" onClick={() => scrollTo("try")}>The Quiet Minute</button>
          <button className="nav-cta" onClick={() => scrollTo("begin")}>Begin</button>
        </div>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      {open && (
        <div className="nav-mobile">
          <button className="nav-link" onClick={() => scrollTo("story")}>My Story</button>
          <button className="nav-link" onClick={() => scrollTo("framework")}>The Return</button>
          <button className="nav-link" onClick={() => scrollTo("products")}>Products</button>
          <button className="nav-link" onClick={() => scrollTo("try")}>The Quiet Minute</button>
          <button className="nav-cta" onClick={() => scrollTo("begin")}>Begin</button>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" className="hero">
      <p className="hero-eyebrow">A practice of coming home</p>
      <h1 className="hero-title">
        You've spent years trying to fit in a world that wasn't built for you.
        It's time to come home
        <em style={{ display: "block" }}>to yourself.</em>
      </h1>
      <div className="hero-divider" />
      <p className="hero-sub">
        For women who always felt out of place.
        The Return is the practice of coming home to yourself —
        one quiet moment at a time.
      </p>
      <div className="hero-cta-group">
        <button className="btn-primary" onClick={() => scrollTo("begin")}>
          Join the free 5-Day Reset
        </button>
        <p className="hero-note">Five days · Five ordinary moments · Completely yours</p>
      </div>
      <button className="hero-scroll" onClick={() => scrollTo("story")}>
        <span className="scroll-line" />
        Begin
      </button>
    </section>
  );
}

function QuietMinuteSection() {
  return (
    <section id="try" className="qm-band">
      <div className="qm-inner">
        <div style={{ textAlign: "center" }}>
          <p className="s-eyebrow">The Quiet Minute</p>
          <h2 className="s-title">One quiet minute.<br />That's all this is.</h2>
          <p className="qm-sub">Choose where you are right now and let yourself be led back — just for a moment. No sign-up, no commitment.</p>
        </div>
        <QuietMinuteTool />
      </div>
    </section>
  );
}

function FrameworkSection() {
  return (
    <section id="framework">
      <div className="s-wrap">
        <p className="s-eyebrow">The Return</p>
        <h2 className="s-title">What is The Return?</h2>
        <div className="s-divider" />
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
        <div className="pillars">
          <div className="pillar">
            <span className="pillar-icon">✦</span>
            <p className="pillar-name">Notice</p>
            <p className="pillar-body">You drifted. That's not a failure — that's human. See it, without judgment.</p>
          </div>
          <div className="pillar">
            <span className="pillar-icon">◈</span>
            <p className="pillar-name">Return</p>
            <p className="pillar-body">Come back. To this moment. To this body. To this breath. Without drama.</p>
          </div>
          <div className="pillar">
            <span className="pillar-icon">◯</span>
            <p className="pillar-name">Stay</p>
            <p className="pillar-body">Be present for the ordinary moment in front of you. That's where life actually is.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" style={{ background: palette.bgCard, borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
      <div className="s-wrap">
        <p className="s-eyebrow">My Story</p>
        <div className="story-grid">
          <img src={naomiImg} alt="Naomi Etnel" className="story-img" />
          <div className="story-text">
            <p className="story-pull">"What I had always been searching for was myself."</p>
            <p className="story-p">For most of my life, I didn't know who I was.</p>
            <p className="story-p">I'm a highly sensitive, multipassionate creative. For years, I thought that was the problem. I couldn't settle, couldn't decide, couldn't figure out what I wanted. I judged myself endlessly for it.</p>
            <p className="story-p">I always knew there was more to me. More to life. But I approached the world differently, never quite fit anywhere, and spent years searching for a place to belong — without realizing I was looking in the wrong direction.</p>
            <p className="story-p">When I became a mother, I went even deeper into survival mode. Running on empty. Showing up for everyone except myself. I didn't even know that's what it was called.</p>
            <p className="story-p">Then, a few years ago, something shifted. I started practicing The Return — those small, deliberate moments of coming back. The morning coffee. The warmth of water in the shower. My children's faces.</p>
            <p className="story-p">Slowly, I started waking up. I started knowing myself. Loving myself.</p>
            <p className="story-p">And I finally understood: what I'd been searching for all along was myself.</p>
            <p className="story-p">And now I'm here for the women who recognize this feeling. The ones who always felt like they were too much, or not enough, or simply somewhere in between. The ones who spent years searching for a place to belong — without realizing the place they were looking for was themselves.</p>
            <p className="story-p">This is where we come home.</p>
            <p className="story-sig">— Naomi</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="products">
      <div className="s-wrap">
        <p className="s-eyebrow">Go Deeper</p>
        <h2 className="s-title">Ways to keep returning.</h2>
        <div className="s-divider" />
        <div className="products-grid">
          <div className="product-card">
            <p className="product-tag">Journal</p>
            <p className="product-title">When Everything Feels Like Too Much</p>
            <p className="product-body">A low-pressure journal designed to come back to whenever you need it — no rules, no routine required. Just a quiet place to land.</p>
            <div className="product-links">
              <a href="https://www.amazon.com/dp/B0GKP611Q9" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ width: "100%" }}>Get it on Amazon</button>
              </a>
              <a href="https://harmonyblissnest.gumroad.com/l/udjal" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-ghost" style={{ width: "100%" }}>Download directly</button>
              </a>
            </div>
          </div>
          <div className="product-card">
            <p className="product-tag">Book</p>
            <p className="product-title">I Was There, But Not Really</p>
            <p className="product-body">Written for mothers — but recognized by every woman who has ever felt lost inside her own life.</p>
            <div className="product-links">
              <a href="https://www.amazon.com/dp/B0GWX2CQ8G" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ width: "100%" }}>Get it on Amazon</button>
              </a>
              <a href="https://harmonyblissnest.gumroad.com/l/ucufv" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-ghost" style={{ width: "100%" }}>Download the ebook</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailSection() {
  return (
    <section id="begin" className="email-band">
      <p className="em-eyebrow">Begin</p>
      <h2 className="em-title">Five days.<br />Five ordinary moments.<br />All yours.</h2>
      <p className="em-body">
        The 5-Day Return Reset — a free email series for women who have lost themselves along the way.
        Come back to yourself, one quiet moment at a time. Two minutes a day. No pressure, no programs.
      </p>
      <div className="em-form-wrap">
        <MailerLiteForm />
      </div>
    </section>
  );
}

function SiteFooter({ onPrivacy }: { onPrivacy: () => void }) {
  return (
    <footer className="footer">
      <p className="footer-wordmark">The Return · Naomi Etnel</p>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <p className="footer-copy">© 2025 · All rights reserved</p>
        <button onClick={onPrivacy} className="footer-policy">Privacy Policy</button>
      </div>
    </footer>
  );
}

function PrivacyPolicy({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: palette.bg, overflowY: "auto",
      padding: "80px 48px 80px", animation: "fadeIn 0.3s ease",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
        <button onClick={onClose} className="btn-back" style={{ alignSelf: "flex-start" }}>← Back to site</button>

        <div>
          <p className="s-eyebrow" style={{ textAlign: "left" }}>Legal</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: palette.textDark, lineHeight: 1.2, marginTop: 8 }}>Privacy Policy</h1>
          <p style={{ fontSize: 12, color: palette.textLight, marginTop: 8, letterSpacing: "0.04em" }}>Last updated: June 2025</p>
        </div>

        {[
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
        ].map(({ heading, body }) => (
          <div key={heading} style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 28 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: palette.textDark, marginBottom: 12 }}>{heading}</p>
            {body.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: 15, fontWeight: 300, color: palette.textMid, lineHeight: 1.85, marginBottom: 12, whiteSpace: "pre-line" }}>{para}</p>
            ))}
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 32, marginTop: 8 }}>
          <button onClick={onClose} className="btn-ghost">← Back to site</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <>
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
    </>
  );
}
