#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path('.').resolve()
EXTS = ('.html', '.js', '.php')

mapping = {
    'about.html': 'about-shanvi-ai.html',
    'service.html': 'ai-consulting-services.html',
    'industries.html': 'industries-ai-solutions.html',
    'resources.html': 'ai-resources.html',
    'case-studies.html': 'ai-case-studies.html',
    'blog.html': 'ai-automation-blog.html',
    'faq.html': 'ai-consulting-faq.html',
    'contact.html': 'contact-shanvi-ai.html',
}

fragment_mapping = {
    'ai-strategy': 'ai-strategy-consulting-services.html',
    'whatsapp-automation': 'whatsapp-automation-services.html',
    'workflow-automation': 'workflow-automation-solutions.html',
    'communication-systems': 'ai-communication-systems.html',
    'integration-services': 'ai-integration-services.html',
    'healthcare': 'healthcare-ai-automation.html',
    'real-estate': 'real-estate-ai-automation.html',
    'ecommerce': 'ecommerce-automation-solutions.html',
    'salons-spas': 'salon-spa-automation.html',
    'coaching-institutes': 'coaching-institute-automation.html',
    'small-businesses': 'small-business-automation.html',
}

def replace_in_text(text, file_path):
    changed = False
    # Replace href= and action= links to files
    for old, new in mapping.items():
        # match within quotes following href= or action=
        pattern = re.compile(r"(?P<prefix>(?:href|action)\s*=\s*[\'\"])(?P<url>[^\'\"]*?\b"+re.escape(old)+r"\b[^\'\"]*)(?P<suffix>[\'\"])",
                             flags=re.IGNORECASE)
        def sub(m):
            url = m.group('url')
            base, q, frag = url, '', ''
            if '#' in url:
                base, frag = url.split('#',1)
                frag = '#'+frag
            if '?' in base:
                base, q = base.split('?',1)
                q = '?'+q
            base = re.sub(r"\b"+re.escape(old)+r"\b", new, base)
            newurl = base + q + frag
            return m.group('prefix') + newurl + m.group('suffix')
        text, n = pattern.subn(sub, text)
        if n:
            changed = True

    # Replace fragment-only hrefs like href="#ai-strategy" -> newpage.html#ai-strategy
    for frag_key, target in fragment_mapping.items():
        pattern = re.compile(r"(?P<prefix>href\s*=\s*[\'\"])#"+re.escape(frag_key)+r"(?P<suffix>[\'\"])",
                             flags=re.IGNORECASE)
        def subfrag(m):
            newurl = target + '#' + frag_key
            return m.group('prefix') + newurl + m.group('suffix')
        text, n = pattern.subn(subfrag, text)
        if n:
            changed = True

    # Replace JS navigation patterns: location.href = 'service.html#frag'
    for old, new in mapping.items():
        pattern_js = re.compile(r"(location\.(?:href|assign)|window\.location)\s*(?:=)\s*([\'\"])(?P<url>[^\'\"]*?\b"+re.escape(old)+r"\b[^\'\"]*)([\'\"])",
                                flags=re.IGNORECASE)
        def subjs(m):
            url = m.group('url')
            base, q, frag = url, '', ''
            if '#' in url:
                base, frag = url.split('#',1)
                frag = '#'+frag
            if '?' in base:
                base, q = base.split('?',1)
                q = '?'+q
            base = re.sub(r"\b"+re.escape(old)+r"\b", new, base)
            newurl = base + q + frag
            return m.group(0).replace(url, newurl)
        text, n = pattern_js.subn(subjs, text)
        if n:
            changed = True

    # Replace location.replace('about.html') style
    for old, new in mapping.items():
        pattern_rep = re.compile(r"(location\.replace|window\.location\.replace)\s*\(\s*([\'\"])(?P<url>[^\'\"]*?\b"+re.escape(old)+r"\b[^\'\"]*)([\'\"])\s*\)", flags=re.IGNORECASE)
        def subrep(m):
            url = m.group('url')
            base, q, frag = url, '', ''
            if '#' in url:
                base, frag = url.split('#',1)
                frag = '#'+frag
            if '?' in base:
                base, q = base.split('?',1)
                q = '?'+q
            base = re.sub(r"\b"+re.escape(old)+r"\b", new, base)
            newurl = base + q + frag
            return m.group(1) + '(' + m.group(2) + newurl + m.group(4) + ')'
        text, n = pattern_rep.subn(subrep, text)
        if n:
            changed = True

    # Replace standalone fragment strings in JS/HTML when in quotes ("#ai-strategy")
    for frag_key, target in fragment_mapping.items():
        text, n = re.subn(r"([\'\"])#"+re.escape(frag_key)+r"([\'\"])", r"\1"+target+"#"+frag_key+r"\2", text)
        if n:
            changed = True

    return text, changed

def main():
    files = list(ROOT.rglob('*'))
    modified_files = []
    for f in files:
        if f.suffix.lower() in EXTS and f.is_file():
            text = f.read_text(encoding='utf-8')
            newtext, changed = replace_in_text(text, f)
            if changed and newtext != text:
                f.write_text(newtext, encoding='utf-8')
                modified_files.append(str(f))

    # After modifications, scan for remaining old urls
    leftovers = []
    for f in files:
        if f.suffix.lower() in EXTS and f.is_file():
            t = f.read_text(encoding='utf-8')
            for old in mapping.keys():
                if re.search(r"\b"+re.escape(old)+r"\b", t):
                    leftovers.append((str(f), old))
            for frag_key in fragment_mapping.keys():
                if re.search(r"href\s*=\s*[\'\"]#"+re.escape(frag_key)+r"[\'\"]", t):
                    leftovers.append((str(f), '#'+frag_key))

    # Print summary
    print('Modified files:')
    for m in modified_files:
        print(m)
    print('\nLeftover old links:')
    for l in leftovers:
        print(l[0] + ' -> ' + l[1])
    if not leftovers:
        print('No leftover old links found.')

if __name__ == '__main__':
    main()
