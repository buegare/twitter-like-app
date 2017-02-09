module ApplicationHelper


	def colorize_hashtag(tweet)
		tweet_with_hashtag_colorized = ''
		tweet.split(' ').each do |w|
			if w.start_with?('#')
				tweet_with_hashtag_colorized += " <span class='hashtag-color'><a href='/hashtag/#{w.sub('#', '%23')}'>#{w}</a></span>"
			else
				tweet_with_hashtag_colorized += " #{w}"
			end
		end

		return tweet_with_hashtag_colorized.html_safe
	end

end
