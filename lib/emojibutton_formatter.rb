module EmojiButtonPlugin
  module Formatter

    # emoji text substitution
    def inline_emoji(text)
      text.gsub!(/:([\w+-]+):/) do |match|
        if emoji = Emoji.find_by_alias($1)
          '<img alt="' + $1 + '" height="20" src="'+ Setting.protocol + "://" + Setting.host_name + '/images/emoji/' + emoji.image_filename + '" style="vertical-align:middle" width="20" title=":' + $1 + ':" class="emoji" />'
        else
          match
        end
      end
    end

  end
end
