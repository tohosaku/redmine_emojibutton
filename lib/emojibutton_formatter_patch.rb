module EmojiButtonPlugin
  module Formatter
    module Patch
      def self.included(base) # :nodoc:
        base.send(:include, EmojiButtonPlugin::Formatter)
        base.class_eval do
          unloadable # Send unloadable so it will not be unloaded in development
          
          # generic formatter patch: override :to_html method and call :inline_emoji afterwards
          alias_method_chain :to_html, :redmine_emojibutton
        end
      end
    end

    # Textile patch: add :inline_emoji to list of textile functions
    # this is the correct way to do for Textile, but it doesn't work both together
    # with the generic formatter patch > override :to_html
    # 
    #Redmine::WikiFormatting::Textile::Formatter::RULES << :inline_emoji

    private
    
    # generic formatter patch: call overridden :to_html function first, then :inline_emoji
    def to_html_with_redmine_emojibutton
      html = to_html_without_redmine_emojibutton
      inline_emoji(html)
    end

    # emoji text substitution
    def inline_emoji(text)
      text.gsub!(/:([a-z0-9\+\-_]+):/) do |match|
        if Emoji.names.include?($1)
          '<img alt="' + $1 + '" height="20" src="'+ Setting.protocol + "://" + Setting.host_name + Redmine::Utils.relative_url_root + '/images/emoji/' + $1 + '.png" style="vertical-align:middle" width="20" title=":' + $1 + ':" class="emoji" />'
        else
          match
        end
      end
    end
  end
end
