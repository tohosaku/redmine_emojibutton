module EmojiButtonPlugin
  module Formatter

    # emoji text substitution
    def inline_emoji(text)
      text.gsub!(/:([a-z0-9\+\-_]+):/) do |match|
        if emoji = Emoji.find_by_alias($1)
          %(<span alt="#$1" title=":#$1:" class="emoji">#{emoji.raw}</span>)
        else
          match
        end
      end
      text
    end

  end
end
