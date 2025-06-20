class CodeFile < ApplicationRecord
  after_create_commit { broadcast :new }
  after_update_commit { broadcast :edited }
  after_destroy_commit { broadcast :deleted }

  private

  def broadcast(action)
    params = { action: action, id: id }
    ActionCable.server.broadcast :code_file_channel, params
  end
end
