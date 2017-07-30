/* read gemoji.json and cache in localStorage
 * JSON file taken from https://github.com/wooorm/gemoji
 */
var gemoji = JSON.parse(localStorage.getItem('gemoji'));
if (!gemoji) $.getJSON(redmineSettingsFullHostname+'/plugin_assets/redmine_emojibutton/javascripts/gemoji.json', function (data) {
  localStorage.setItem('gemoji', JSON.stringify(data));
});
gemoji = JSON.parse(localStorage.getItem('gemoji'));

// hard-code the different emoji groups
var emojiGroups = ["People", "Nature", "Foods", "Activity", "Places", "Objects", "Symbols", "Flags"];

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
        var emojiGroup = group.toLowerCase();

        jQuery.each( gemoji, function( emoji, emojiObject ) {
          if(emojiObject.category == emojiGroup) {
            var code = emojiObject.names[0];
            var description = emojiObject.description;
            var aliases = emojiObject.names.map(function(n){ return ':'+n+':' }).join(' / ');

            emojiTab.append(
              $(document.createElement('span'))
                .addClass('emoji')
                .attr('title', aliases +' ('+ description +')')
                .attr('alt', description)
                .attr('data-code', code)
                .html(emoji)
              );
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
