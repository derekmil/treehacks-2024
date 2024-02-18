from fastapi import APIRouter

router = APIRouter()


@router.get("/search/")
async def search(query: str):
    pass


content = [
    {
        "key": "/resumeList",
        "content": "% === BEGIN resumeList SECTION ===\n\\begin{itemize}\n  \\item ${1:First item}\n  \\item ${2:Second item}\n\\end{itemize}\n% === END resumeList SECTION ===",
    },
    {
        "key": "/unionsetproof",
        "content": "\\${First set}\n  \\${union symbol}\n  \\${secondset}",
    },
    {
        "key": "DeMorgan's Law",
        "content": "% Applying DeMorgan's Law\n% NOT (A OR B) is equivalent to NOT A AND NOT B\n% NOT (A AND B) is equivalent to NOT A OR NOT B\n\\overline{${1:A} \\cup ${2:B}} = \\overline{${1:A}} \\cap \\overline{${2:B}}\n\\overline{${1:A} \\cap ${2:B}} = \\overline{${1:A}} \\cup \\overline{${2:B}}\n% Replace A and B with your specific variables",
    },
    {"key": "not op", "content": "\\neg"},
    {"key": "or op", "content": "\\lor"},
    {"key": "and op", "content": "\\land"},
    {"key": "sum op", "content": "\\sum_{i=${1:1}}^{${2:n}} ${3:expr}"},
    {"key": "uni", "content": "\\cup"},
    {"key": "intersec", "content": "\\cap"},
    {"key": "curly", "content": "\\{ $1 \\}"},
    {"key": "square", "content": "\\[ $1 \\]"},
    {"key": "angle", "content": "\\langle $1 \\rangle"},
    {"key": "bar", "content": "\\bar{$1}"},
    {"key": "cup", "content": "\\bigcup_{$1}^{$2}"},
    {"key": "cap", "content": "\\bigcap_{$1}^{$2}"},
    {
        "key": "/resumeHeader",
        "content": "% === BEGIN resumeHeader SECTION ===\n\\begin{center}\n    \\textbf{\\Huge \\scshape ${1:Name}} \\\\ \\vspace{1pt}\n    \\small \\faIcon{envelope} ${2:email@example.com} $|$ \\faIcon{globe} \\href{${3:https://yourwebsite.com/}}{\\underline{Personal Website}} $|$ \\faIcon{youtube} \\href{${4:https://www.youtube.com}}{\\underline{Self Intro Video}} $|$\n    \\faIcon{linkedin} \\href{${5:https://www.linkedin.com/in/yourprofile/}}{\\underline{LinkedIn}}$|$\n    \\faIcon{github}\n    \\href{${6:https://github.com/yourusername}}{\\underline{Github}}\n\\end{center}\n% === END resumeHeader SECTION ===",
    },
    {
        "key": "/resumeTemplate",
        "content": "% === HEADING SECTION ===\n\\begin{center}\n    \\textbf{\\Huge \\scshape ${1:Your Name}} \\\\ \\vspace{1pt}\n    \\small \\faIcon{envelope} ${2:your_email@example.com} $|$ \\faIcon{globe} \\href{${3:https://yourwebsite.com/}}{\\underline{Personal Website}} $|$ \\faIcon{youtube} \\href{${4:https://www.youtube.com}}{\\underline{Self Intro Video}} $|$\n    \\faIcon{linkedin} \\href{${5:https://www.linkedin.com/in/yourprofile/}}{\\underline{LinkedIn}}$|$\n    \\faIcon{github} \\href{${6:https://github.com/yourusername}}{\\underline{Github}}\n\\end{center}\n% === END HEADING SECTION ===\n% === EDUCATION SECTION ===\n\\section{Education}\n  \\resumeSubHeadingListStart\n    \\resumeSubheading\n      {${7:University Name}}{${8:City, State}}\n      {\\emph{${9:Degree} in ${10:Major}}}{\\emph{${11:Graduation Month, Year}}}\n  \\resumeSubHeadingListEnd\n% === END EDUCATION SECTION ===\n% === EXPERIENCE SECTION ===\n\\section{Experience}\n  \\resumeSubHeadingListStart\n    \\resumeSubheading\n      {${12:Company Name}}{${13:Location}}\n      {\\emph{${14:Job Title}}}{\\emph{${15:Start Date – End Date}}}\n      \\resumeItemListStart\n        \\resumeItem{${16:Description of your responsibility or achievement}}\n      \\resumeItemListEnd\n  \\resumeSubHeadingListEnd\n% === END EXPERIENCE SECTION ===\n% === PROJECTS SECTION ===\n\\section{Projects}\n  \\resumeSubHeadingListStart\n    \\resumeProjectHeading\n          {\\textbf{${17:Project Name}} $|$ \\emph{${18:Technologies Used}}}{${19:Date}}\n          \\resumeItemListStart\n            \\resumeItem{${20:Project description and achievements}}\n          \\resumeItemListEnd\n  \\resumeSubHeadingListEnd\n% === END PROJECTS SECTION ===\n% === ADDITIONAL INFORMATION SECTION ===\n\\section{Additional}\n \\begin{itemize}[leftmargin=0.15in, label={}]\n    \\small{\\item{\n       \\resumeItemListStart\n            \\resumeItem{${21:Interesting fact or hobby}}\n       \\resumeItemListEnd\n    }}\n \\end{itemize}\n% === END ADDITIONAL INFORMATION SECTION ===",
    },
]
