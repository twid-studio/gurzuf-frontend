import React from 'react'
import './LegalPage.scss'

export default function LegalPage({data}) {
  const renderBlockContent = (blockContent) => {
    if (!blockContent || !Array.isArray(blockContent)) {
      return null;
    }

    const elements = [];
    let currentList = [];

    blockContent.forEach((block, index) => {
      if (block._type === 'block') {
        const text = block.children?.map(child => child.text).join('') || '';
        
        // Handle list items
        if (block.listItem === 'bullet') {
          currentList.push(
            <li key={block._key || index} className="list-item">
              {text}
            </li>
          );
          return;
        }
        
        // If we have accumulated list items, render them as a ul
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="bullet-list">
              {currentList}
            </ul>
          );
          currentList = [];
        }
        
        // Check if text has strong formatting
        const hasStrong = block.children?.some(child => 
          child.marks?.includes('strong')
        );
        
        if (hasStrong) {
          elements.push(
            <p key={block._key || index} className="paragraph strong">
              {block.children?.map((child, childIndex) => (
                <span 
                  key={child._key || childIndex}
                  className={child.marks?.includes('strong') ? 'bold' : ''}
                >
                  {child.text}
                </span>
              ))}
            </p>
          );
        } else {
          elements.push(
            <p key={block._key || index} className="paragraph">
              {text}
            </p>
          );
        }
      }
    });

    // Handle any remaining list items
    if (currentList.length > 0) {
      elements.push(
        <ul key="final-list" className="bullet-list">
          {currentList}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="legal-page">
      <div className="top container">
        <p className="date shadow">{data?.date}</p>
        <h1 className="title">{data?.title}</h1>
      </div>

      <div className="content">
        {data?.blockContent && (
          <div className="block-content">
            {renderBlockContent(data.blockContent)}
          </div>
        )}
      </div>
    </div>
  )
}
