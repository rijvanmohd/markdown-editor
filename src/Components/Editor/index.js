import 'draft-js/dist/Draft.css';
import './index.css';

import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import applyBlockType from '../../helpers/applyBlockType';
import clearAllInlineStyles from '../../helpers/clearAllInlineStyles';
import applyInlineStyle from '../../helpers/applyInlineStyle';
import Button from '../Button';

const styleMap = {
    'redText': {
      color: 'red',
    },
};

const MarkdownEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const editorRef = useRef(null);
  
  useEffect(() => {
    const savedData = localStorage.getItem('content');
    if (savedData) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(savedData))));
    }
    if (editorRef.current && !savedData) {
      editorRef.current?.focus();
    }
  }, []);
  
  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    localStorage.setItem('content', JSON.stringify(raw));
    window.alert('Saved current editor state');
  };

  const onChange = (newState) => {
    const currentContent = editorState.getCurrentContent();
    const newContent = newState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(editorState.getSelection().getStartKey());
    const newBlock = newContent.getBlockForKey(newState.getSelection().getStartKey());
  
    let newEditorState = newState;
  
    const currentStyles = editorState.getCurrentInlineStyle().toArray();
    // Check if a new block has started
    if (currentBlock.getKey() !== newBlock.getKey()) {
      // If a new block has started, remove all inline styles from the previous block
      newEditorState = clearAllInlineStyles(newEditorState, currentStyles);
    }
  
    const text = newBlock.getText();
    if (text.startsWith('* ')) {
      newEditorState = applyInlineStyle(newEditorState, 'BOLD');
    } else if (text.startsWith('** ')) {
      newEditorState = applyInlineStyle(newEditorState, 'redText');
    } else if (text.startsWith('*** ')) {
      newEditorState = applyInlineStyle(newEditorState, 'UNDERLINE');
    } else if (text.startsWith('# ')) {
      newEditorState = applyBlockType(newEditorState, 'header-one');
    } else if (text.startsWith('``` ')) {
      newEditorState = applyBlockType(newEditorState, 'code-block');
    }
  
    setEditorState(newEditorState);
  };

  return (
    <div className='editor-container'>
      <div className="editor-header">
        <div className='header-title'>Editor By Rijvan</div>
        <div className='header-buttons'>
          <Button onClick={saveContent}>Save</Button>
        </div>
      </div>
      <div className="editor">
        <Editor
            editorState={editorState}
            onChange={onChange}
            customStyleMap={styleMap}
            ref={editorRef}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;