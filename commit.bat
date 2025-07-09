@echo off
setlocal enabledelayedexpansion

REM Get list of modified or untracked files
for /f "delims=" %%f in ('git ls-files --others --modified --exclude-standard') do (
    echo Committing and pushing: %%f

    REM Add file
    git add "%%f"

    REM Commit with message
    git commit -m "update: %%f"

    REM Push to the current branch
    git push

    echo -----------------------------
)

echo All done!
pause
