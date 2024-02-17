import { useState } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

import './App.css'

function App() {



  return (
    <div>
      <Editor height="90vh" width="100vw" defaultLanguage="javascript" defaultValue="// some comment" />;
    </div>
  )
}

export default App
