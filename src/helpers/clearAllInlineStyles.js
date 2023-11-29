import { RichUtils } from 'draft-js';

function clearAllInlineStyles(editorState, styles) {
    // Remove all current styles
    let newEditorState = editorState;
    const currentInlineStyles = editorState.getCurrentInlineStyle();
    styles.forEach(style => {
        if(currentInlineStyles.has(style)){
            newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
        }
    });

    newEditorState = RichUtils.toggleBlockType(newEditorState, 'unstyled');
  
    return newEditorState;
};

export default clearAllInlineStyles;