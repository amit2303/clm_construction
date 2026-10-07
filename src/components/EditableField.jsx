import React, { useRef, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';

export default function EditableField({
  value,
  onChange,
  as: Component = 'span',
  multiline = false,
  className = '',
  style = {},
  placeholder = 'Click to edit...',
}) {
  const { isAdmin } = useCMS();
  const elementRef = useRef(null);
  const isFocusedRef = useRef(false);
  const initialValueRef = useRef(value);

  // Sync value from props when not actively focused/typing
  useEffect(() => {
    if (elementRef.current && !isFocusedRef.current) {
      const current = elementRef.current.innerText;
      const next = value || '';
      if (current !== next) {
        elementRef.current.innerText = next;
      }
    }
  }, [value, isAdmin]);

  if (!isAdmin || !onChange) {
    return (
      <Component className={className} style={style}>
        {value}
      </Component>
    );
  }

  const handleInput = (e) => {
    onChange(e.currentTarget.innerText);
  };

  const handleFocus = (e) => {
    isFocusedRef.current = true;
    const el = e.currentTarget;
    el.style.outline = '2px solid #F59E0B';
    el.style.outlineOffset = '3px';
    el.style.borderRadius = '3px';
    el.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.28)';
    const isGradient = style && (style.WebkitBackgroundClip === 'text' || style.backgroundClip === 'text');
    if (!isGradient) {
      el.style.backgroundColor = 'rgba(245, 158, 11, 0.07)';
    }
  };

  const handleBlur = (e) => {
    isFocusedRef.current = false;
    const el = e.currentTarget;
    el.style.outline = '';
    el.style.outlineOffset = '';
    el.style.backgroundColor = '';
    el.style.boxShadow = '';

    const finalVal = el.innerText;
    if (finalVal !== value) {
      onChange(finalVal);
    }
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
    // Ctrl+Z / Cmd+Z — allow browser's native undo inside contentEditable
  };

  const handlePaste = (e) => {
    // Prevent rich HTML paste — insert plain text only
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    // Use modern insertText approach with fallback
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    // Trigger onChange after paste
    onChange(e.currentTarget.innerText + text);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Component
      ref={elementRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      className={`admin-inline-editable ${className}`}
      style={{
        ...style,
        cursor: 'text',
        minWidth: '20px',
        display: Component === 'span' ? 'inline-block' : undefined,
      }}
      onClick={handleClick}
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      title="Admin: Click and type directly to edit"
      data-placeholder={placeholder}
      dangerouslySetInnerHTML={{ __html: initialValueRef.current }}
    />
  );
}
