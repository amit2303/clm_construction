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

  // Sync value from props when not actively focused/typing
  useEffect(() => {
    if (elementRef.current && !isFocusedRef.current) {
      if (elementRef.current.innerText !== (value || '')) {
        elementRef.current.innerText = value || '';
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
    const newText = e.currentTarget.innerText;
    onChange(newText);
  };

  const handleFocus = (e) => {
    isFocusedRef.current = true;
    e.currentTarget.style.outline = '2px solid #F59E0B';
    e.currentTarget.style.outlineOffset = '2px';
    e.currentTarget.style.borderRadius = '3px';
    const isGradient = style && (style.WebkitBackgroundClip === 'text' || style.backgroundClip === 'text');
    if (!isGradient) {
      e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.08)';
    }
    e.currentTarget.style.boxShadow = '0 0 10px rgba(245, 158, 11, 0.25)';
  };

  const handleBlur = (e) => {
    isFocusedRef.current = false;
    e.currentTarget.style.outline = '';
    e.currentTarget.style.outlineOffset = '';
    e.currentTarget.style.backgroundColor = '';
    e.currentTarget.style.boxShadow = '';

    const finalVal = e.currentTarget.innerText;
    if (finalVal !== value) {
      onChange(finalVal);
    }
  };

  const handleKeyDown = (e) => {
    // If not multiline (like headings, titles, phone numbers), prevent Enter key from adding newlines
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handlePaste = (e) => {
    // Prevent rich HTML paste — only paste plain text
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    document.execCommand('insertText', false, text);
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
      }}
      onClick={handleClick}
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      title="Admin: Click and type directly to edit text"
      data-placeholder={placeholder}
    >
      {value}
    </Component>
  );
}
