export function getLinkTarget(url) {
  if (!url) return "_self";
  
  // Get current domain
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
  
  try {
    // Check if it's an absolute URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const urlObj = new URL(url);
      // If it's a different domain, open in new tab
      return urlObj.hostname !== currentDomain ? "_blank" : "_self";
    }
    
    // Check if it's a protocol-relative URL (//example.com)
    if (url.startsWith('//')) {
      const urlObj = new URL(`https:${url}`);
      return urlObj.hostname !== currentDomain ? "_blank" : "_self";
    }
    
    // If it starts with / or is relative, it's internal
    if (url.startsWith('/') || !url.includes('://')) {
      return "_self";
    }
    
    // Default to blank for external
    return "_blank";
    
  } catch (error) {
    // If URL parsing fails, treat as internal link
    return "_self";
  }
}