require 'emojibutton_formatter_patch'
require 'emojibutton_helper_patch'

Redmine::Plugin.register :redmine_emojibutton do
  name 'Redmine Emoji Button'
  author 'Akinori Tomita & Tobias Fischer'
  description "Enable github style emoji's in tickets and comments and choose emojis from a new editor button"
  version '0.1.0'
  url 'https://github.com/paginagmbh/redmine_emojibutton'
end

Rails.configuration.to_prepare do
  Rails.configuration.assets.paths << Emoji.images_path

  unless Redmine::WikiFormatting::Textile::Formatter.included_modules.include? EmojiButtonPlugin::Formatter::Patch
    Redmine::WikiFormatting::Textile::Formatter.send(:include, EmojiButtonPlugin::Formatter::Patch)
  end
  
  unless Redmine::WikiFormatting::Textile::Helper.included_modules.include? EmojiButtonPlugin::Helper::Patch
    Redmine::WikiFormatting::Textile::Helper.send(:include, EmojiButtonPlugin::Helper::Patch)
  end
end
