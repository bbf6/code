class CodeFileChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'code_file_channel'
  end

  def unsubscribed
  end
end
