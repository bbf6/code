class CodeFileController < ApplicationController
  include BuildTree

  before_action :find_file, only: [:update, :rename, :delete]

  def index
    files = find_files
    render json: BuildTree.create(files)
  end

  def file_content
    code_file = CodeFile.find params[:id]
    render json: code_file.as_json(only: [:filename, :content])
  end

  def create
    filename = params[:filename].gsub(' ', '_')
    values = { filename: filename, content: '' }
    return render json: :created if CodeFile.create(values)
    render json: :conflict
  end

  def update
    return render json: :ok if @file.update(file_params)
    render json: :conflict
  end

  def rename
    parts = @file.filename.split '/'
    name = rename_params[:filename].gsub(' ', '_').gsub('/', '')
    new_name = (parts[0..-2] + [name]).join '/'
    return render json: :ok if @file.update(filename: new_name)
    render json: :conflict
  end

  def delete
    return render json: :ok if @file.destroy
    render json: :conflict
  end

  private

  def find_file
    @file = CodeFile.find params[:id]
  end

  def find_files
    CodeFile.all
  end

  def file_params
    params.require(:code_file).permit(:content)
  end

  def rename_params
    params.require(:code_file).permit(:filename)
  end
end
