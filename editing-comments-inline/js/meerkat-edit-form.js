// Demonstrates utilizing the Meerkat API to enable authenticated users to update their own comments from a site's theme.
(function () {

    var updateCommentEndpoint = '/!/Meerkat/update';

    function updateCommentContent(commentId, newContent) {
        return window.axios.post(updateCommentEndpoint, {
            comment: newContent,
            ids: [commentId]
        });
    }

    $(document).ready(function () {
        $('[data-meerkat-comment-form="edit"]').on('click', function (e) {
            var commentId = $(this).data('meerkat-comment-id');
            var originalContent = decodeURIComponent($(this).data('meerkat-original-content'));

            // Get the content container for this comment.
            var commentContainer = $('[data-meerkat-comment="' + commentId + '"]')[0];

            // Store a reference to the container's current content.
            var currentContent = $(commentContainer).html();

            // Get the edit form template.
            var template = $('#meerkatEditFormTemplate').html();

            // Updates the inline comment to use the template.
            $(commentContainer).html(template);

            // Hold a reference to our error container.
            var errorContainer = $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="error"]')[0];

            $(errorContainer).hide();

            // Hide the status message.
            $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="updating"]').hide();

            // Set the value of the newly created textarea.
            $('[data-meerkat-comment="' + commentId + '"]  [data-meerkat-edit="content"]').val(originalContent);

            $('[data-meerkat-comment="' + commentId + '"]  [data-meerkat-edit="submit"]').on('click', function (e) {
                var newContent = $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="content"]').val();

                // Hide the action buttons.
                $('[data-meerkat-comment="' + commentId + '"]  [data-meerkat-edit="submit"]').hide();
                $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="cancel"]').hide();

                // Show the status message.
                $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="updating"]').show();

                updateCommentContent(commentId, newContent).then(function (response) {
                    if (response.data.success) {
                        // Display the new content to the user.
                        $(commentContainer).html(response.data.parsedContent);

                        // Set the new "original" markdown data property.
                        $('[data-meerkat-comment-id="' + commentId + '"]')
                            .data('meerkat-original-content', JSON.stringify(response.data.originalMarkdown));

                        // Show the edit button again.
                        $('[data-meerkat-comment-form="edit"][data-meerkat-comment-id="' + commentId + '"]').show();

                    } else {
                        $(errorContainer).show().text(response.data.errorMessage);

                        // Show the action buttons.
                        $('[data-meerkat-comment="' + commentId + '"]  [data-meerkat-edit="submit"]').show();
                        $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="cancel"]').show();

                        // Hide the status message.
                        $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="updating"]').hide();
                    }
                }).catch(function () {
                    $(errorContainer).show().text('Something unexpected happened. Please try again in a moment.');

                    // Show the action buttons.
                    $('[data-meerkat-comment="' + commentId + '"]  [data-meerkat-edit="submit"]').show();
                    $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="cancel"]').show();

                    // Hide the status message.
                    $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="updating"]').hide();
                });

                e.preventDefault();

                return false;
            });

            // Hooks up the newly generated Cancel button.
            $('[data-meerkat-comment="' + commentId + '"] [data-meerkat-edit="cancel"]').on('click', function (e) {

                // Restore the content.
                $(commentContainer).html(currentContent);

                // Show the edit button again.
                $('[data-meerkat-comment-form="edit"][data-meerkat-comment-id="' + commentId + '"]').show();

                e.preventDefault();

                return false;
            });

            // Hides the edit comment link.
            $('[data-meerkat-comment-form="edit"][data-meerkat-comment-id="' + commentId + '"]').hide();

            console.log('comment', commentId, originalContent);
            console.log('container', commentContainer);
            console.log('container', template);

            e.preventDefault();

            return false;
        });
    });

})();