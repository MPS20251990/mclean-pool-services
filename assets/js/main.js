document.addEventListener('DOMContentLoaded', function() {
     loadApprovedReviews();
});

function loadApprovedReviews() {
     var container = document.getElementById('reviews-container');
     if (!container) return;

  fetch('/data/reviews.json')
       .then(function(res) { return res.json(); })
       .then(function(reviews) {
                container.innerHTML = '';
                reviews.slice(0, 5).forEach(function(review) {
                           var card = document.createElement('div');
                           card.className = 'review-card';

                                                    var starsDiv = document.createElement('div');
                           starsDiv.className = 'stars';
                           starsDiv.textContent = '\u2605'.repeat(review.rating) + '\u2606'.repeat(5 - review.rating);
                           card.appendChild(starsDiv);

                                                    var textP = document.createElement('p');
                           textP.textContent = review.text;
                           card.appendChild(textP);

                                                    var authorP = document.createElement('p');
                           authorP.className = 'author';
                           authorP.textContent = '\u2014 ' + review.name;
                           card.appendChild(authorP);

                                                    container.appendChild(card);
                });
       })
       .catch(function(err) {
                console.error('Reviews load error:', err);
                var msg = document.createElement('p');
                msg.textContent = 'Reviews coming soon.';
                container.appendChild(msg);
       });
}
