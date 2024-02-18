
export const latexTemplate = `
\\documentclass[12pt]{article}

% Package for encoding
\\usepackage[utf8]{inputenc}

% Package for English language
\\usepackage[english]{babel}

% Package for extended graphics
\\usepackage{graphicx}

% Package for better control over margins
\\usepackage[margin=1in]{geometry}

% Package for hyperlinks
\\usepackage{hyperref}

\\title{Your Document Title}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract goes here.
\\end{abstract}

\\section{Introduction}
Your introduction text goes here.

\\section{Methodology}
Describe your methodology here.

\\section{Results}
Present your results here.

\\section{Discussion}
Discuss your findings here.

\\section{Conclusion}
Your concluding remarks go here.

% Reference section
\\begin{thebibliography}{9}
\\bibitem{latexcompanion} 
Michel Goossens, Frank Mittelbach, and Alexander Samarin. 
\\textit{The \\LaTeX\\ Companion}. 
Addison-Wesley, Reading, Massachusetts, 1993.
 
\\bibitem{einstein} 
Albert Einstein. 
\\textit{Zur Elektrodynamik bewegter K{\\"o}rper}. (German) 
[\\textit{On the electrodynamics of moving bodies}]. 
Annalen der Physik, 322(10):891–921, 1905.

\\bibitem{knuthwebsite} 
Knuth: Computers and Typesetting,
\\\\texttt{http://www-cs-faculty.stanford.edu/\\~{}uno/abcde.html}
\\end{thebibliography}

\\end{document}
`;