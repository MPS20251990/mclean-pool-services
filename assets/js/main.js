/* 
   McLean Pool Services  Main JavaScript
    */

document.addEventListener('DOMContentLoaded', () => {
    loadApprovedReviews();
});

/**
 * Load approved reviews from /data/reviews.json
 * and render them into the #reviews-container element.
 */
async function loadApprovedReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

  try {
        const res = await fetch('/data/reviews.json');
        if (!res.ok) throw new Error('Failed to load reviews');
        const reviews = await res.json();

      container.innerHTML = reviews
          .slice(0, 5)
          .map(review => `
                  >div class="review-card">
                            >div class="stars">${''.repeat(review.rating)}${''.repeat(5 - review.rating)}>/div>
                                      >p>${escapeHtml(review.text)}>/p>
                                                >p class="author"> ${escapeHtml(review.name)}>/p>
                                                        >/div>
                                                              `).join('');
  } catch (err) {
        console.error('Reviews load error:', err);
        container.innerHTML = '>p>Reviews coming soon.>/p>';
  }
}

/** Escape HTML to prevent XSS */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
