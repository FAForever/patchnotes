# Security Policy

## Supported Versions

We take security seriously and aim to keep the FAForever Patchnotes site secure for all users.

| Version | Supported          |
| ------- | ------------------ |
| 2.2.x   | :white_check_mark: |
| 2.1.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Security Features

### Current Implementations

✅ **Content Security Policy Ready**
- Prepared for CSP implementation
- External resources from trusted CDNs only

✅ **Subresource Integrity (SRI)**
- Font Awesome uses SRI hashes
- Prevents tampering with external resources

✅ **HTTPS Only**
- All external resources loaded via HTTPS
- PWA requires HTTPS in production

✅ **Input Sanitization**
- Search queries are properly escaped
- No eval() or innerHTML with user input

✅ **Service Worker Security**
- Scoped to origin
- Cache validation
- Secure update mechanism

### Privacy Protections

- No third-party tracking scripts
- Local analytics only (privacy-friendly)
- No personal data collection
- No cookies required
- Offline-first PWA architecture

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

### How to Report

1. **Email:** security@faforever.com (preferred)
2. **Discord:** Direct message to a moderator on [FAForever Discord](https://discord.gg/mXahAXy)
3. **GitHub:** Open a security advisory (not a public issue)

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)
- Your contact information

### Response Timeline

- **Initial Response:** Within 48 hours
- **Assessment:** Within 1 week
- **Fix Timeline:** Based on severity
  - Critical: 24-48 hours
  - High: 1 week
  - Medium: 2-4 weeks
  - Low: Next scheduled release

### What to Expect

1. **Acknowledgment:** We'll confirm receipt of your report
2. **Assessment:** We'll assess the severity and impact
3. **Fix Development:** We'll work on a patch
4. **Disclosure:** Coordinated disclosure after fix is deployed
5. **Credit:** We'll credit you in the release notes (unless you prefer to remain anonymous)

## Security Best Practices for Contributors

### Code Review Checklist

- [ ] No use of `eval()` or `Function()` constructor
- [ ] No `innerHTML` with user-provided content
- [ ] Sanitize all user inputs
- [ ] Use HTTPS for all external resources
- [ ] Add SRI hashes for CDN resources
- [ ] Validate data from patches.json
- [ ] No sensitive data in client-side code
- [ ] Proper error handling (no stack traces to users)

### Dependency Security

When adding dependencies:
- Use specific versions (no `latest` or `*`)
- Check for known vulnerabilities
- Use SRI hashes for CDN resources
- Document why the dependency is needed

### PWA Security

- Service worker scope is limited to origin
- Cache only trusted resources
- Validate cached data before use
- Update service worker regularly

## Known Security Considerations

### Service Worker Cache

**Consideration:** Cached content could become stale

**Mitigation:**
- Cache versioning (increment on updates)
- Background sync for updates
- Manual cache clear option

### External CDN Resources

**Consideration:** CDN could be compromised

**Mitigation:**
- SRI hashes verify integrity
- Fallback mechanisms for critical resources
- Regular security reviews

### Client-Side Data

**Consideration:** patches.json could be tampered with

**Mitigation:**
- Validation script checks data structure
- No executable code in JSON
- Display-only data (no security decisions based on it)

## Security Roadmap

### Planned Improvements

- [ ] Implement Content Security Policy headers
- [ ] Add comprehensive input validation library
- [ ] Automated dependency vulnerability scanning
- [ ] Security headers (X-Frame-Options, X-Content-Type-Options)
- [ ] Automated security testing in CI/CD
- [ ] Regular third-party security audits

### Future Enhancements

- [ ] Report-URI for CSP violations
- [ ] Security.txt file
- [ ] Bug bounty program (if resources allow)

## Responsible Disclosure

We believe in responsible disclosure. Please:

- Give us reasonable time to fix issues before public disclosure
- Do not exploit vulnerabilities for malicious purposes
- Do not access or modify data that doesn't belong to you
- Work with us to understand and mitigate the issue

## Contact

For security-related questions or concerns:

- **Security Email:** security@faforever.com
- **General Issues:** GitHub Issues (for non-sensitive topics)
- **Discord:** [FAForever Community](https://discord.gg/mXahAXy)

---

**Thank you for helping keep FAForever Patchnotes secure!**

*Last Updated: February 5, 2026*
