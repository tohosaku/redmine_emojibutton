/* read gemoji.json and cache in localStorage
 * JSON file taken from https://github.com/wooorm/gemoji
 */
var gemoji_version = '4.0.0.rc1';
var max_unicode_version = 12.1;

var gemoji = JSON.parse(localStorage.getItem('gemoji' + gemoji_version));
if (!gemoji) $.getJSON(redmineSettingsFullHostname+'/plugin_assets/redmine_emojibutton/javascripts/emoji.json', function (data) {
  localStorage.setItem('gemoji' + gemoji_version, JSON.stringify(data));
});
gemoji = JSON.parse(localStorage.getItem('gemoji' + gemoji_version));

// hard-code the different emoji groups
var emojiGroups = ["Smileys & Emotion", "People & Body", "Animals & Nature", "Food & Drink", "Activities", "Travel & Places", "Objects", "Symbols", "Flags"];

// add texteditor button with action
jsToolBar.prototype.elements.emoji = {
  type: 'button',
  title: 'Emoji',
  fn: {
    wiki: function() {
      precodeTextField = this;

      // create emoji modal dialog
      var emojiDialog = $(document.createElement('div'))
        .attr('id','emojiDialog')
        .attr('title', 'Insert emoticon');
      var emojiTabContainer = $(document.createElement('div')).attr('id','emojiTabs');
      emojiDialog.append(emojiTabContainer);
      $("#main").append(emojiDialog);

      // create emoji modal tab nav
      var emojiTabNav = $(document.createElement('ul'));
      jQuery.each( emojiGroups, function( i, group ) {
        emojiTabNav.append(
          $(document.createElement('li')).append(
            $(document.createElement('a'))
              .attr('href', '#tabs-'+ (i+1))
              .attr('style', 'cursor:pointer')
              .html(group)
            )
          );
      });
      emojiTabContainer.append(emojiTabNav);

      // create emoji modal tab boards
      jQuery.each( emojiGroups, function( i, group ) {
        var emojiTab = $(document.createElement('div')).attr('id','tabs-'+(i+1));

        jQuery.each( gemoji, function( j, emojiObject ) {
          if(emojiObject.category == group) {
            var emoji = emojiObject.emoji;
            var code = emojiObject.aliases[0];
            var description = emojiObject.description;
            var aliases = emojiObject.aliases.map(function(n){ return ':'+n+':' }).join(' / ');
            var unicode_version = emojiObject.unicode_version;

            if(unicode_version <= max_unicode_version) {
              emojiTab.append(
                $(document.createElement('span'))
                  .addClass('emoji')
                  .attr('title', aliases +' ('+ description +')')
                  .attr('alt', description)
                  .attr('data-code', code)
                  .html(emoji)
                );
            }
          }
        });
        emojiTabContainer.append(emojiTab);
      });

      // set active tab to 0 as default
      $("#emojiTabs").tabs({ active: 0 });

      // set emoji dialog as modal dialog
      $("#emojiDialog").dialog({modal:true, width:'590px'});

      // add an event listener to insert emojis to textarea
      $("#emojiTabs span[data-code]").click(function() {
        precodeTextField.encloseSelection(':'+$(this).attr('data-code')+':');
        hideModal($(this));
        $('#emojiDialog').remove();
        return false;
      });
    }
  }
}
