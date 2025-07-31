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
        // Skip empty blocks
        const text = block.children?.map(child => child.text).join('') || '';
        if (!text.trim()) {
          return;
        }
        
        // Handle list items
        if (block.listItem === 'bullet') {
          currentList.push(
            <li key={block._key || index} className="list-item">
              {block.children?.map((child, childIndex) => (
                <span 
                  key={child._key || childIndex}
                  className={child.marks?.includes('strong') ? 'bold' : ''}
                >
                  {child.text}
                </span>
              ))}
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
        
        // Render content based on style
        const renderChildren = () => {
          return block.children?.map((child, childIndex) => (
            <span 
              key={child._key || childIndex}
              className={child.marks?.includes('strong') ? 'bold' : ''}
            >
              {child.text}
            </span>
          ));
        };

        // Handle different block styles
        switch (block.style) {
          case 'h1':
            elements.push(
              <h1 key={block._key || index} className="heading-1">
                {renderChildren()}
              </h1>
            );
            break;
          case 'h2':
            elements.push(
              <h2 key={block._key || index} className="heading-2">
                {renderChildren()}
              </h2>
            );
            break;
          case 'h3':
            elements.push(
              <h3 key={block._key || index} className="heading-3">
                {renderChildren()}
              </h3>
            );
            break;
          case 'h4':
            elements.push(
              <h4 key={block._key || index} className="heading-4">
                {renderChildren()}
              </h4>
            );
            break;
          case 'h5':
            elements.push(
              <h5 key={block._key || index} className="heading-5">
                {renderChildren()}
              </h5>
            );
            break;
          case 'h6':
            elements.push(
              <h6 key={block._key || index} className="heading-6">
                {renderChildren()}
              </h6>
            );
            break;
          case 'blockquote':
            elements.push(
              <blockquote key={block._key || index} className="blockquote">
                {renderChildren()}
              </blockquote>
            );
            break;
          default:
            // Normal paragraph
            const hasStrong = block.children?.some(child => 
              child.marks?.includes('strong')
            );
            
            elements.push(
              <p key={block._key || index} className={hasStrong ? "paragraph strong" : "paragraph"}>
                {renderChildren()}
              </p>
            );
            break;
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
