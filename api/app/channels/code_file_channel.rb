class CodeFileChannel < ApplicationCable::Channel
  CHANNEL_NAME = 'code_file_channel'

  def subscribed
    stream_from CHANNEL_NAME
  end

  def unsubscribed
  end

  def editing(data)
    payload = { action: 'editing', file: data['file'], user: data['user'] }
    ActionCable.server.broadcast(CHANNEL_NAME, payload)
  end
end
