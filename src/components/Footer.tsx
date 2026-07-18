import { brand, footerLinks, privacyPolicyUrl } from '../data/siteData'

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__tagline">{brand.tagline}</p>
            <a href="/" className="site-logo site-logo--footer">
              {brand.name}
            </a>
          </div>
          <ul className="site-footer__social">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <a href={privacyPolicyUrl}>개인정보처리방침</a>
        </div>
      </div>
    </footer>
  )
}
