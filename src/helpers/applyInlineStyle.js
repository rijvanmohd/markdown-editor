import { EditorState, RichUtils, Modifier } from 'draft-js';

const applyInlineStyle = (editorState, style) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    const startOffset = text.indexOf(' ') + 1;
    let newEditorState = editorState;
  
    // Remove the special characters
    let newContentState = Modifier.replaceText(
      contentState,
      selection.merge({ anchorOffset: 0, focusOffset: startOffset }),
      ''
    );
  
    newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
  
    // Apply the style
    newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
  
    return newEditorState;
};

export default applyInlineStyle;