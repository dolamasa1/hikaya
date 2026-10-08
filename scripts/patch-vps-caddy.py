from pathlib import Path

root = Path("/opt/primexa/deploy/vps")
caddy_path = root / "Caddyfile"
compose_path = root / "docker-compose.yml"
caddy = caddy_path.read_text()
compose = compose_path.read_text()

if "/hikaya" not in caddy:
    needle = "\thandle {\n\t\treverse_proxy frontend:3000\n\t}"
    insert = (
        "\thandle /hikaya {\n"
        "\t\tredir /hikaya/ permanent\n"
        "\t}\n\n"
        "\thandle_path /hikaya/* {\n"
        "\t\troot * /srv/hikaya\n"
        "\t\ttry_files {path} {path}/ /index.html\n"
        "\t\tfile_server\n"
        "\t}\n\n"
        "\thandle {\n"
        "\t\treverse_proxy frontend:3000\n"
        "\t}"
    )
    if needle not in caddy:
        raise SystemExit("caddy handle block not found")
    (root / "Caddyfile.bak.hikaya").write_text(caddy)
    caddy_path.write_text(caddy.replace(needle, insert, 1))

mount = "      - ./sites/hikaya:/srv/hikaya:ro\n"
if mount not in compose:
    needle = "      - uploads:/srv/media:ro\n"
    if needle not in compose:
        raise SystemExit("compose media mount not found")
    (root / "docker-compose.yml.bak.hikaya").write_text(compose)
    compose_path.write_text(compose.replace(needle, needle + mount, 1))

print("patched")
