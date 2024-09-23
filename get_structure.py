import os
import json


def get_repository_content(root_path, exclude_list):
    content = {}

    for dirpath, dirnames, filenames in os.walk(root_path):
        # Remove excluded directories
        dirnames[:] = [d for d in dirnames if d not in exclude_list]

        current_dir = content
        for dir_name in os.path.relpath(dirpath, root_path).split(os.sep):
            if dir_name == ".":
                continue
            current_dir = current_dir.setdefault(dir_name, {})

        for filename in filenames:
            if filename not in exclude_list and not any(
                filename.endswith(ext) for ext in exclude_list
            ):
                file_path = os.path.join(dirpath, filename)
                try:
                    with open(file_path, "r", encoding="utf-8") as file:
                        file_content = file.read()
                    current_dir[filename] = file_content
                except Exception as e:
                    current_dir[filename] = f"Error reading file: {str(e)}"

    return content


# Exclude list for files and directories
exclude_list = [
    ".git",
    "node_modules",
    ".next",
    ".vscode",
    ".idea",
    "__pycache__",
    ".DS_Store",
    "package-lock.json",
    ".gitignore",
    ".env",
    ".env.local",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    "repository_content.json",
]

# Replace 'path/to/your/repository' with the actual path to your repository
repo_path = "./"

repository_content = get_repository_content(repo_path, exclude_list)

# Save the content to a JSON file
with open("repository_content.json", "w", encoding="utf-8") as json_file:
    json.dump(repository_content, json_file, indent=2)

print("Repository content has been saved to 'repository_content.json'")
