require 'emojibutton_formatter_patch'
require 'emojibutton_helper_patch'

Redmine::Plugin.register :redmine_emojibutton do
  name 'Redmine Emoji Button'
  author 'Akinori Tomita & Tobias Fischer'
  description "Enable github style emoji's in tickets and comments and choose emojis from a new editor button"
  version '0.3.0'
  url 'https://github.com/paginagmbh/redmine_emojibutton'
end

Rails.configuration.to_prepare do
  Rails.configuration.assets.paths << Emoji.images_path

  # send Emoji Patches to all wiki formatters available to be able to switch formatter without app restart
  Redmine::WikiFormatting::format_names.each do |format|
    unless Redmine::WikiFormatting::formatter_for(format).included_modules.include? EmojiButtonPlugin::Formatter::Patch
      Redmine::WikiFormatting::formatter_for(format).send(:include, EmojiButtonPlugin::Formatter::Patch)
    end
    unless Redmine::WikiFormatting::helper_for(format).included_modules.include? EmojiButtonPlugin::Helper::Patch
     Redmine::WikiFormatting::helper_for(format).send(:include, EmojiButtonPlugin::Helper::Patch)
    end
  end
end
