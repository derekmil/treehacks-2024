import * as monaco from "monaco-editor-core";
import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;
import ILanguage = monaco.languages.IMonarchLanguage;

export const richLanguageConfiguration: IRichLanguageConfiguration = {
    // If we want to support code folding, brackets ... ( [], (), {}....), we can override some properties here
    // check the doc
};

export const keywords = ["begin", "beginend", "left(", "left[", "left{", "bigl(", "bigl[", "bigl{", "Bigl(", "Bigl[", "Bigl{", "biggl(", "biggl[", "biggl{", "Biggl(", "Biggl[", "Biggl{", "frame", "title{}", "part{}", "chapter{}", "section{}", "subsection{}", "subsubsection{}", "paragraph{}", "subparagraph{}", "bibliography{}", "bibliographystyle{}", "caption{}", "footnote{}", "cite{}", "textcite{}", "parencite{}", "citeyear{}", "shortcite{}", "emph{}", "textbf{}", "textit{}", "textmd{}", "textnormal{}", "textrm{}", "textsc{}", "textsf{}", "textsl{}", "texttt{}", "textup{}", "textwidth", "ttfamily", "label{}", "ref{}", "pageref{}", "author{}", "pagestyle{}", "hspace{}", "hspace*{}", "vspace{}", "vspace*{}", "usepackage{}", "item", "multicolumn{}{}{}", "documentclass{}", "tableofcontents", "linespread{}", "date", "today", "underline{}", "rule{}{}", "pagebreak", "noindent", "nonumber", "kill", "tiny", "scriptsize", "footnotesize", "small", "normalsize", "large", "Large", "LARGE", "huge", "Huge", "raggedleft", "raggedright", "centering", "cline{}", "hline", "text{}", "sqrt{}", "frac{}{}", "bar{}", "alpha", "beta", "chi", "delta", "epsilon", "varepsilon", "eta", "gamma", "iota", "kappa", "lambda", "mu", "nu", "omega", "phi", "varphi", "pi", "varpi", "psi", "rho", "varrho", "sigma", "varsigma", "tau", "theta", "vartheta", "upsilon", "xi", "zeta", "Delta", "Gamma", "Lambda", "Omega", "Phi", "Pi", "Psi", "Sigma", "Theta", "Upsilon", "Xi", "exists", "in", "notin", "subset", "supset", "leftarrow", "Leftarrow", "Leftrightarrow", "rightarrow", "Rightarrow", "infty", "div", "approx", "mid", "neg", "setminus", "sum", "prime", "geq", "partial", "pm", "times", "cap", "bigcap", "cup", "bigcup", "vee", "prod", "circ", "wedge", "neq", "forall", "leq", "equiv", "dot{}", "ddot{}", "acute{}", "breve{}", "check{}", "grave{}", "hat{}", "widehat{}", "tilde{}", "widetilde{}", "vec{}", "addcontentsline{}{}{}", "appendix", "appendixname", "arabic{}", "ensuremath{}", "bibitem{}", "bibitem[]{}", "caption[]{}", "chapter*{}", "chapter[]{}", "chaptermark{}", "chaptername{}", "cite[]{}", "cleardoublepage", "clearpage", "contentsline{}{}{}", "contentsname{}", "cdot", "cdots", "ldots", "ddots", "documentclass[]{}", "fbox{}", "figurename{}", "footnotemark", "footnotemark[]", "footnotetext[]{}", "footnotetext{}", "footnote[]{}", "glossaryentry{}{}", "glossary", "hlinefill", "input", "include{}", "includegraphics{}", "includegraphics[]{}", "includeonly{}", "indexname{}", "index{}", "inputlineno", "item[]", "itshape", "LaTeX", "linebreak", "linebreak[]", "makeatletter", "makeatother", "maketitle", "marginpar[]{}", "marginpar{}", "markboth{}{}", "markright{}", "mbox{}", "newline", "newpage", "newtheorem{}[]{}", "newtheorem{}{}", "newtheorem{}{}[]", "nocite{}", "nolinebreak", "nolinebreak[]", "nopagebreak", "nopagebreak[]", "underbrace{}", "overbrace{}", "overline{}", "pagebreak[]", "pagename", "pagenumbering{}", "paragraph*{}", "paragraph[]{}", "parbox[]{}{}", "parbox{}{}", "part*{}", "part[]{}", "rule[]{}{}", "section*{}", "section[]{}", "stackrel{}{}", "subparagraph*{}", "subparagraph[]{}", "subsection*{}", "subsection[]{}", "subsubsection*{}", "subsubsection[]{}", "thanks{}", "thispagestyle", "usepackage[]{}", "newcommand{}[][]{}", "newcommand{}[]{}", "newcommand{}{}", "providecommand{}[][]{}", "providecommand{}[]{}", "providecommand{}{}", "newenvironment{}[][]{}{}", "newenvironment{}[]{}{}", "newenvironment{}{}{}", "renewcommand{}[][]{}", "renewcommand{}[]{}", "renewcommand{}{}", "renewenvironment{}[][]{}{}", "renewenvironment{}[]{}{}", "renewenvironment{}{}{}", "roman{}", "Roman{}", "framebox[][]{}", "framebox[]{}", "listoffigures", "listoftables", "makeglossary", "makeindex", "mathbb{}", "mathbf{}", "mathcal{}", "mathds{}", "mathit{}", "mathnormal{}", "mathrm{}", "mathscr{}", "mathsf{}", "mathtt{}", "displaystyle"];

export const monarchLanguage: ILanguage = {
    keywords,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
        root: [
            [/[a-z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword' },
                    '@default': 'identifier'
                }
            }],
            { include: '@whitespace' },
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
            [/(\\[a-zA-Z]+\*?)(\{)/, ["keyword", "delimiter.bracket"]],
            [/(\\[a-zA-Z]+\*?)/, ["keyword"]],
            [/(%.*)/, 'comment'],
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ]
    },
}

