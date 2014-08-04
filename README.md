Redmine Gemoji Plugin
=====================

This plugin enables github style emoji notation in textile formatter and adds a new button to the wiki editor to insert emoji's more easily.


Installation
------------

 1. Copy the plugin directory into the `plugins` directory, for example:
 
        $ cd /home/redmine/redmine-${version}/plugins
        $ git clone https://github.com/paginagmbh/redmine_emojibutton.git

 2. Run bundler (from the plugin directory):

        $ bundle install

 3. Run rake task (from the Redmine root directory):

        $ rake emoji

 4. Restart redmine


Usage
-----

* Use emoji codes from http://www.emoji-cheat-sheet.com
* Insert emojis with new button in issue/wiki editor


License
-------

*redmine_emojibutton* plugin is released under the [MIT License](LICENCE).
