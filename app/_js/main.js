(function (doc, win) {
    "use strict";

    var util = {

        share: function() {
            var baseUrl = 'https://www.facebook.com/sharer/sharer.php?u=';

            var fbUrl = window.location.protocol + '//' + window.location.host; // + window.location.pathname;

            var url = baseUrl + encodeURIComponent(fbUrl);

            window.open(url, 'share_fb', 'width=500, height=300, toolbar=no, status=no, menubar=no');
        },

        tweet: function() {
            // var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
            var url = window.location.host;

            var tweet = document.querySelector('meta[name="twittertext"]');
            tweet = (tweet ? tweet.content : '') + ' ' + url;

            window.open('https://twitter.com/intent/tweet?text='+tweet, 'share_tw', 'width=500, height=300, toolbar=no, status=no, menubar=no');
        },

        google_plus: function() {
            var url = window.location.protocol + '//' + window.location.host;
            window.open('https://plus.google.com/share?url='+url, 'share_gl', 'width=500, height=300, toolbar=no, status=no, menubar=no');
        }
    }

    var fb = document.querySelectorAll('button.facebook');
    for (var i = 0; i < fb.length; i++) {
        fb[i].addEventListener('click', function(e) {
            e.preventDefault();
            util.share();
        }, false);
    }

    var tw = document.querySelectorAll('button.twitter');
    for (var i = 0; i < tw.length; i++) {
        tw[i].addEventListener('click', function(e) {
            e.preventDefault();
            util.tweet();
        }, false);
    }

    var gl = document.querySelectorAll('button.google');
    for (var i = 0; i < gl.length; i++) {
        gl[i].addEventListener('click', function(e) {
            e.preventDefault();
            util.google_plus();
        }, false);
    }

    var signups = document.querySelectorAll('form.signup');

    for (var i = 0; i < signups.length; i++) {
        signups[i].addEventListener('submit', function (e) {
            e.preventDefault();

            var page_id = this.id || 'www-signup';
            var email = this.querySelector('input[name="email"]');
            var name = this.querySelector('input[name="name"]');
            var zip = this.querySelector('input[name="zip"]');

            var errors = false;

            if (!email.value) {
                email.className = 'error';
                errors = true;
            }
            if (!name.value) {
                name.className = 'error';
                errors = true;
            }
            if (!zip.value) {
                zip.className = 'error';
                errors = true;
            }
            if (errors) {
                return alert('Please fill out all fields :)');
            }

            new OrgReferralController({page_id: page_id}).submit({
                email: email.value,
                first_name: name.value,
                zip: zip.value
            });

            new ShareModalController({
                headline: 'Thanks for signing!',
                text: 'We will deliver your signature to President Obama. Together we will make sure the Internet always wins! Please join one of our rallies on Tuesday, February 23rd and be sure to share this page <3'
            });
        });
    }

})(document, window);
