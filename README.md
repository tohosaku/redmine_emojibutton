Redmine Gemoji Plugin
=====================

This plugin enables github style emoji notation in textile formatter and adds a new button to the wiki editor to insert emoji's more easily.

*This plugin is roughly based on a fork of the [redmine_gemoji](https://github.com/tmy/redmine_gemoji) plugin, made by [@tmy](https://github.com/tmy/) and others. Thanks! :smirk:*

*This plugin is listed in the [Redmine plugin directory](http://www.redmine.org/plugins/redmine_emojibutton)*


Compatibility
-------------

This branch (`gemoji-4.0-native-emojis-no-images`) supports Redmine **3.x** and **4.x**.

**PLEASE NOTE:** This branch (`gemoji-4.0-native-emojis-no-images`) uses the `gemoji` gem and displays emojis as native Unicode emojis. Due to the nature of Unicode symbols and system fonts, this will show emojis on different operating systems differently. If you want a consistent display, use the `master` branch instead which displays emojis as images. The downside, however, is that there is no support for *latest* emojis – and will never be.


Installation
------------

1. Clone the plugin directory into the `plugins` directory, for example:

        $ cd /home/redmine/redmine-${version}/plugins
        $ git clone https://github.com/paginagmbh/redmine_emojibutton.git
        $ git checkout gemoji-4.0-native-emojis-no-images

2. Run bundler (from the **plugin directory**, e.g. `/home/redmine/redmine-${version}/plugins/redmine_emojibutton`):

        $ bundle install

3.  Run the plugin rake task to provide the assets (from the Redmine root directory):

        $ rake redmine:plugins:migrate RAILS_ENV=production

4. Restart redmine


Usage
-----

* Insert emojis with new button in issue/wiki editor
* Use emoji codes from http://www.emoji-cheat-sheet.com



Update the plugin
-----------------

1. Pull the changes from the repository:

        $ cd /home/redmine/redmine-${version}/plugins/redmine_emojibutton
        $ git fetch
        $ git pull origin gemoji-4.0-native-emojis-no-images

2. Run bundler (from the **plugin directory**, e.g. `/home/redmine/redmine-${version}/plugins/redmine_emojibutton`):

        $ bundle update

3.  Run the plugin rake task to provide the assets (from the Redmine root directory):

        $ rake redmine:plugins:migrate RAILS_ENV=production

4. Restart redmine


License
-------

*redmine_emojibutton* plugin is released under the [MIT License](LICENCE).
