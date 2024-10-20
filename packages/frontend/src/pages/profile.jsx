import { IdleAnimation, SkinViewer } from "skinview3d";
import { createEffect, createSignal } from "solid-js";
import { failure } from "../services";
import { authMiddleware, editProfile, profile } from "../api";

export default function Profile() {
  authMiddleware();
  const [skinType, setSkinType] = createSignal(false);

  let skinCanvas;
  let skinViewer;

  createEffect(() => {
    skinViewer = new SkinViewer({
      canvas: skinCanvas,
      width: 300,
      height: 400,
      skin: "data:image/png;base64,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",
    });

    skinViewer.animation = new IdleAnimation();

    skinViewer.camera.position.x = -10;
    skinViewer.camera.position.y = 10;
    skinViewer.camera.position.z = 40;
  });

  createEffect(() => {
    const _profile = profile();
    if (!_profile) return;

    _profile.skinUrl && skinViewer.loadSkin(_profile.skinUrl);
    setSkinType(_profile.isAlex);
    _profile.capeUrl && skinViewer.loadCape(_profile.capeUrl);
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("isAlex", skinType());
    editProfile(formData);
  };

  const loadSkin = (e) => {
    loadImage(e, async (img) => {
      await skinViewer.loadSkin(img);
      setSkinType(skinViewer.playerObject.skin.modelType === "slim");
    });
  };

  const loadCape = (e) => {
    loadImage(e, (img) =>
      skinViewer.loadCape(img).catch((e) => failure(e.message)),
    );
  };

  const loadImage = (e, onload) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onload(reader.result);
    reader.readAsDataURL(file);
  };

  const changeSkinType = (e) => {
    skinViewer.playerObject.skin.modelType = e.target.checked
      ? "slim"
      : "default";
    setSkinType(e.target.checked);
  };

  const changeCapeElytra = (e) => {
    if (!skinViewer.playerObject.backEquipment) {
      return;
    }

    skinViewer.playerObject.backEquipment = e.target.checked
      ? "elytra"
      : "cape";
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6 p-6 bg-neutral-800 rounded profile">
      <div>
        <canvas
          ref={skinCanvas}
          className="rounded bg-neutral-700 bg-opacity-20"
        ></canvas>
        <div className="flex items-center justify-center">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-300 mr-2">
            Плащ
          </span>
          <label className="relative inline-flex items-center cursor-pointer my-2">
            <input
              type="checkbox"
              name="isAlex"
              className="sr-only peer"
              onChange={changeCapeElytra}
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-neutral-900 dark:text-neutral-300">
              Элитры
            </span>
          </label>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <table className="mb-6 w-full">
          <tbody>
            <tr>
              <td className="font-medium w-24">Тип скина:</td>
              <td className="flex items-center">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-300 mr-2">
                  Default
                </span>
                <label className="relative inline-flex items-center cursor-pointer my-2">
                  <input
                    type="checkbox"
                    name="isAlex"
                    className="sr-only peer"
                    onChange={changeSkinType}
                    checked={skinType()}
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-neutral-900 dark:text-neutral-300">
                    Slim
                  </span>
                </label>
              </td>
            </tr>
            <tr>
              <td className="hidden md:table-cell"></td>
              <td className="hidden md:table-cell">
                <small className="text-neutral-500">
                  Определяется автоматически. Переключайте, если тип скина
                  определился с ошибкой.
                </small>
              </td>
              <td className="md:hidden" colSpan={2}>
                <small className="text-neutral-500">
                  Определяется автоматически. Переключайте, если тип скина
                  определился с ошибкой.
                </small>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          type="file"
          name="skin"
          id="skin"
          hidden
          accept="image/png"
          onChange={loadSkin}
        />
        <label
          htmlFor="skin"
          className="inline-block px-4 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer mr-3"
        >
          Загрузить скин
        </label>
        <input
          type="file"
          name="cape"
          id="cape"
          hidden
          accept="image/png"
          onChange={loadCape}
        />
        <label
          htmlFor="cape"
          className="inline-block px-4 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer mt-2 mr-3"
        >
          Загрузить плащ
        </label>
        <br />
        <button className="px-4 py-2 mt-6 border bg-blue-600 border-blue-700 hover:bg-blue-500 hover:border-blue-600 transition-colors rounded-lg save-button mr-3">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
