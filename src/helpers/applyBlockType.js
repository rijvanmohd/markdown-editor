import { EditorState, RichUtils, Modifier } from 'draft-js';

function applyBlockType(editorState, blockType) {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    const startOffset = text.indexOf(' ') + 1;
  
    // Remove the special characters
    let newContentState = Modifier.replaceText(
      contentState,
      selection.merge({ anchorOffset: 0, focusOffset: startOffset }),
      ''
    );
  
    let newEditorState = EditorState.push(editorState, newContentState, 'change-block-type');
  
    // Apply the block type
    newEditorState = RichUtils.toggleBlockType(newEditorState, blockType);
  
    return newEditorState;
};

export default applyBlockType;