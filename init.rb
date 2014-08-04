require 'emojibutton_formatter_patch'

Redmine::Plugin.register :gemoji do
  name 'Gemoji plugin'
  author 'Akinori Tomita'
  description 'Enable github style emoji'
  version '0.0.2'
  url 'https://github.com/tmy/redmine_gemoji'
  author_url 'https://github.com/tmy'
end

Rails.configuration.to_prepare do
  Rails.configuration.assets.paths << Emoji.images_path

  unless Redmine::WikiFormatting::Textile::Formatter.included_modules.include? EmojiButtonPlugin::Formatter::Patch
    Redmine::WikiFormatting::Textile::Formatter.send(:include, EmojiButtonPlugin::Formatter::Patch)
  end
end
