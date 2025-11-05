import React from 'react';

interface SocialShareProps {
  url: string;
  title?: string;
  text?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title = "Send me anonymous messages!",
  text = "Check out this anonymous messaging app - send me messages without revealing your identity!"
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      <button
        onClick={() => handleShare('twitter')}
        className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-green-300"
        title="Share on Twitter"
      >
        🐦 Twitter
      </button>
      <button
        onClick={() => handleShare('facebook')}
        className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-green-300"
        title="Share on Facebook"
      >
        📘 Facebook
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-green-300"
        title="Share on WhatsApp"
      >
        💬 WhatsApp
      </button>
      <button
        onClick={() => handleShare('telegram')}
        className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-green-300"
        title="Share on Telegram"
      >
        ✈️ Telegram
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-green-300"
        title="Share on LinkedIn"
      >
        💼 LinkedIn
      </button>
      <button
        onClick={() => handleShare('email')}
        className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-green-300"
        title="Share via Email"
      >
        ✉️ Email
      </button>
    </div>
  );
};

export default SocialShare;