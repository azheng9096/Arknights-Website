$(document).ready(function() {
    /* .stop() to prevent effects from queueing up */
    
    /* INDEX */

    /* [INDEX] STORY MEDIA IMG HOVER */
    var mediaDiv = $("#storyMedia").children("div");
    mediaDiv.hover(function() {
        // mouseenter
        // #storyMediaOverlay initial display is none, need to set it to relative or else it's default block
        $("#storyMediaOverlay").stop().fadeIn().css("display", "relative");

    }, function() {
        // mouseleave
        $("#storyMediaOverlay").stop().fadeOut();
    })



    /* [INDEX] CARDS ONCLICK */
    $(".ftCard").click(function() {
        var ftCardThumbnail = $(this).find(".ftCardThumbnail");
        var notFtCardContentOverlay = $(this).children("div").children(":not(.ftCardContentOverlay)");

        /* ORIGINAL, WITHOUT ALLOWING REVERSE ANIMATION */
        /*
        ftCardThumbnail.animate({
            "width": "65%",
            "margin-top" : "0"
        }, function() {
            // callback function (executes after animate finishes)
            ftCardThumbnail.fadeOut(2000);

            notFtCardContentOverlay.animate({"opacity" : "1"}, 1000);
        });
        */

        if (!ftCardThumbnail.hasClass("invisible")) {
            ftCardThumbnail.stop().animate({
                "width": "65%",
                "margin-top" : "0"
            }, function() {
                // callback function (executes after animate finishes)

                ftCardThumbnail.stop().fadeOut(2000);
    
                notFtCardContentOverlay.stop().animate({"opacity" : "1"}, 1000, function() {
                    ftCardThumbnail.addClass("invisible");
                });

                /* didn't use this one because fading was less obvious with the previous method
                notFtCardContentOverlay.stop().animate({"opacity" : "1"}, 1000, function() {
                    ftCardThumbnail.stop().fadeOut(function() {
                        ftCardThumbnail.addClass("invisible");
                    });
                });
                */
            });
        } else {

            ftCardThumbnail.stop().fadeIn(function(){
                
                notFtCardContentOverlay.stop().animate({"opacity" : "0"}, 1000, function() {

                    /* 
                    interestingly this ftCardThumbnail.stop() prevented the spasming when style is removed
                    (margin-top: auto and margin-bottom: auto are restored).
                    */
                    ftCardThumbnail.stop().animate({
                        "width" : "100%",
                        "margin-bottom" : "0"
                    }, function() {
                        ftCardThumbnail.removeAttr("style");
                        // have to remove margin-top : 0 and margin-bottom : 0 so we can animate margin-top : 0 and margin-bottom : 0 again
                        /* note that [margin-top:auto;margin-bottom:auto] and [margin-top:0;margin-bottom:0] in this case 
                        achieves the same effect since the img has [align-self:center] */
    
                        ftCardThumbnail.removeClass("invisible");
                    });
                });

            });

        }

    });


    
    /* CHARACTERS */
    /* [CHARACTERS] ARTIST NAME ONCLICK */
    var artistNameContainer = $(".charCardArtist").children("p");
    artistNameContainer.click(function(){
        // get artist
        var artistName = $(this).text();
        
        // set artist (other) data
        var artistImgLink = "",
        artistOccupation = "Occupation", 
        artistPersonalPageLink = "",
        artistPersonalPage = "<s>Not Available</s>",
        artistPixivLink = "",
        artistPixiv = "<s>Not Available</s>",
        artistTwitterLink = "",
        artistTwitter = "<s>Not Available</s>",
        artistInstagramLink = "",
        artistInstagram = "<s>Not Available</s>",
        artistWeiboLink = "",
        artistWeibo = "<s>Not Available</s>",
        artistEmailLink = "",
        artistEmail = "<s>Not Available</s>";

        if (artistName == "幻象黑兔") {
            artistImgLink = "images/hxhtPFP.png";
            artistOccupation = "Artist";
            artistPersonalPageLink = "https://www.huashi6.com/painter/24521";
            artistPersonalPage = "幻象黑兔 (画师主页)";
            artistPixivLink = "https://www.pixiv.net/users/4462245";
            artistPixiv = "4462245";
            artistTwitterLink = "https://twitter.com/coneyrivard";
            artistTwitter = "@coneyrivard";
            artistWeiboLink = "https://weibo.com/u/3188613133";
            artistWeibo = "幻像黒兎";
        } else if (artistName == "NoriZC") {
            artistImgLink = "images/norizcPFP.jpg";
            artistOccupation = "Illustrator, Graphic Designer";
            artistPersonalPageLink = "https://www.behance.net/norizc";
            artistPersonalPage = "Fangyuan Gu (Behance)";
            artistPixivLink = "https://www.pixiv.net/users/4592232";
            artistPixiv = "4592232";
            artistTwitterLink = "https://www.twitter.com/norizci";
            artistTwitter = "@NoriZCI";
            artistInstagramLink = "https://www.instagram.com/norizci/";
            artistInstagram = "@norizci";
            artistWeiboLink = "https://weibo.com/n/NoriZC";
            artistWeibo = "NoriZC";
        } else if (artistName == "Skade") {
            artistImgLink = "images/skadePFP.jpg";
            artistOccupation = "Artist";
            artistPixivLink = "https://www.pixiv.net/users/25193";
            artistPixiv = "25193";
            artistTwitterLink = "https://twitter.com/skadels";
            artistTwitter = "@skadels";
            artistWeiboLink = "https://weibo.com/skadels";
            artistWeibo = "Skade";
        }

        // get artist card fields
        var card = $("#artistCard");

        var cardImg = card.find(".artistProfileImg");
        var cardName = card.find(".artistName");
        var cardOccupation = card.find(".artistSub");

        var cardPersonal = card.find(".artistPersonal").find("a");
        var cardPersonalText = card.find(".artistPersonal").find(".contactTableInfo").find("a");
        var cardPixiv = card.find(".artistPixiv").find("a");
        var cardPixivText = card.find(".artistPixiv").find(".contactTableInfo").find("a");
        var cardTwitter = card.find(".artistTwitter").find("a");
        var cardTwitterText = card.find(".artistTwitter").find(".contactTableInfo").find("a");
        var cardInstagram = card.find(".artistInstagram").find("a");
        var cardInstagramText = card.find(".artistInstagram").find(".contactTableInfo").find("a");
        var cardWeibo = card.find(".artistWeibo").find("a");
        var cardWeiboText = card.find(".artistWeibo").find(".contactTableInfo").find("a");
        var cardEmail = card.find(".artistEmail").find("a");
        var cardEmailText = card.find(".artistEmail").find(".contactTableInfo").find("a");

        // set artist card fields
        cardImg.attr("src", artistImgLink);
        cardName.text(artistName);
        cardOccupation.text(artistOccupation);

        // set artist card fields cont. check for empty fields
        if (artistPersonalPageLink !== "") {
            cardPersonal.attr("href", artistPersonalPageLink);
        }
        cardPersonalText.html(artistPersonalPage);
        if (artistPixivLink !== "") {
            cardPixiv.attr("href", artistPixivLink);
        }
        cardPixivText.html(artistPixiv);
        if (artistTwitterLink !== "") {
            cardTwitter.attr("href", artistTwitterLink);
        }
        cardTwitterText.html(artistTwitter);
        if (artistInstagramLink !== "") {
            cardInstagram.attr("href", artistInstagramLink);
        }
        cardInstagramText.html(artistInstagram);
        if (artistWeiboLink !== "") {
            cardWeibo.attr("href", artistWeiboLink);
        }
        cardWeiboText.html(artistWeibo);
        if (artistEmailLink !== "") {
            cardEmail.attr("href", artistEmailLink);
        }
        cardEmailText.html(artistEmail);


        // fade in
        $("#artistCardContainer").stop().fadeIn().css("display", "flex");
    });

    /* [CHARACTER] ARTIST CARD CLOSE BUTTON */
    $("#artistCardCloseBtn").click(function() {
        $("#artistCardContainer").stop().fadeOut(function() {
            // get all artist card fields
            var card = $("#artistCard");

            var cardImg = card.find(".artistProfileImg");
            var cardName = card.find(".artistName");
            var cardOccupation = card.find(".artistSub");

            var cardPersonal = card.find(".artistPersonal").find("a");
            var cardPersonalText = card.find(".artistPersonal").find(".contactTableInfo").find("a");
            var cardPixiv = card.find(".artistPixiv").find("a");
            var cardPixivText = card.find(".artistPixiv").find(".contactTableInfo").find("a");
            var cardTwitter = card.find(".artistTwitter").find("a");
            var cardTwitterText = card.find(".artistTwitter").find(".contactTableInfo").find("a");
            var cardInstagram = card.find(".artistInstagram").find("a");
            var cardInstagramText = card.find(".artistInstagram").find(".contactTableInfo").find("a");
            var cardWeibo = card.find(".artistWeibo").find("a");
            var cardWeiboText = card.find(".artistWeibo").find(".contactTableInfo").find("a");
            var cardEmail = card.find(".artistEmail").find("a");
            var cardEmailText = card.find(".artistEmail").find(".contactTableInfo").find("a");

            // clear artist card fields
            cardImg.attr("src", "");
            cardName.text("Name");
            cardOccupation.text("Occupation");

            cardPersonal.removeAttr("href");
            cardPersonalText.html("Personal/Main Page");
            cardPixiv.removeAttr("href");
            cardPixivText.html("Pixiv");
            cardTwitter.removeAttr("href");
            cardTwitterText.html("Twitter");
            cardInstagram.removeAttr("href");
            cardInstagramText.html("Instagram");
            cardWeibo.removeAttr("href");
            cardWeiboText.html("Weibo");
            cardEmail.removeAttr("href");
            cardEmailText.html("Email");
        });
        
    });



    /* CONTACT */
    /* [CONTACT] SUBMIT ONCLICK */
    $("#contactForm").children("form").submit(function(e) {
        // get form input fields
        var inputNameText = $(this).find("input[name='name']");
        var inputUIDText = $(this).find("input[name='uid']");
        var inputEmailText = $(this).find("input[name='email']");
        var inputTextarea = $(this).find("textarea");

        // get form error fields
        var errorName = $(this).find("label[for='name']");
        var errorUID = $(this).find("label[for='uid']");
        var errorEmail = $(this).find("label[for='email']");
        var errorTextarea = $(this).find("label[for='message']");

        // bool
        var errors = false;

        // check input name
        if (inputNameText.val().trim().length == 0) {
            errorName.text("This field cannot be empty");
            errorName.slideDown();
            errors = true;
        } else {
            errorName.slideUp();
        }

        // check input uid
        if (inputUIDText.val().trim().length == 0) {
            errorUID.text("This field cannot be empty");
            errorUID.slideDown();
            errors = true;
        } else if (isNaN(inputUIDText.val().trim())) {
            errorUID.text("Invalid UID (enter numbers only)");
            errorUID.slideDown();
            errors = true;
        } else {
            errorUID.slideUp();
        }

        var inputEmailStr = inputEmailText.val().trim();
        var atIndex = inputEmailStr.indexOf('@');
        var dotIndex = inputEmailStr.lastIndexOf('.');
        // check input email
        if (inputEmailStr.length == 0) {
            errorEmail.text("This field cannot be empty");
            errorEmail.slideDown();
            errors = true;
        } else if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex == inputEmailStr.length - 1) {
            // simple email checker
            // @ cannot be first character of string, come right after @, or be absent
            // Last . cannot come before @ or be absent or be the last character
            errorEmail.text("Invalid email");
            errorEmail.slideDown();
            errors = true;
        } else {
            errorEmail.slideUp();
        }
        // check input textarea
        if(inputTextarea.val().trim().length == 0) {
            errorTextarea.text("This field cannot be empty");
            errorTextarea.slideDown();
            errors = true;
        } else {
            errorTextarea.slideUp();
        }


        // if there is errors, prevent submission
        if (errors) {
            e.preventDefault();
        }

    });

    /* [CONTACT] RESET ONCLICK - RESET ALL ERRORS */
    $("#contactForm").children("form").on('reset', function(e) {
        // get form error fields
        var errorName = $(this).find("label[for='name']");
        var errorUID = $(this).find("label[for='uid']");
        var errorEmail = $(this).find("label[for='email']");
        var errorTextarea = $(this).find("label[for='message']");

        errorName.slideUp();
        errorUID.slideUp();
        errorEmail.slideUp();
        errorTextarea.slideUp();
    });


});