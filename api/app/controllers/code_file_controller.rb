class CodeFileController < ApplicationController
  def index
    render json: tree
  end

  def file_content
    code_file = CodeFile.find params[:id]
    render json: code_file.as_json(only: [:filename, :content])
  end

  private

  def find_files
    CodeFile.all
  end

  def file_format(file)
    "#{file.filename}.#{file.id}"
  end

  def tree
    splitted = find_files.map { |f| file_format(f).split('/') }
    splitted
      .map { |r| append_to_tree( r[0], r[1..]) }
      .reduce { |a, b| a.deep_merge(b) }
  end

  def append_to_tree(hash = {}, head, tail)
    hash[head] = {} unless hash[head]
    new_head, *new_tail = tail
    hash[head] = new_head ? append_to_tree(hash[head], new_head, new_tail) : nil
    hash
  end
end
