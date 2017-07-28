module EmojiButtonPlugin
  module Formatter

    # emoji text substitution
    def inline_emoji(text)
      text.gsub!(/:([a-z0-9\+\-_]+):/) do |match|
        index = Gemojione::Index.new
        if index.find_by_name($1)
          #Rails.logger.info 'aa-' + $1
          #Rails.logger.info 'aa-' + Gemojione.replace_named_moji_with_images(match)
          Gemojione.replace_named_moji_with_images(match)
        elsif index.find_by_ascii($1)
          #Rails.logger.info 'bb-' + $1
          #Rails.logger.info 'bb-' + Gemojione.replace_ascii_moji_with_images(match)
          Gemojione.replace_ascii_moji_with_images(match)
        else
          #Rails.logger.info 'cc' + $1
          match
        end
      end
      text
    end

  end
end
