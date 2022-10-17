<template>
  <div class="empty-asset-list-container">
    <img class="empty-asset-list" src="src/assets/images/how-to-use-asset-list-view.png" alt="How to use asset list" />
    <div class="empty-list-grid">
      <div class="text-wrapper">
        <h4>Assets suchen</h4>
        <p>Suche oder erstelle Assets, um dein Portfolio vollumfänglich abzubilden.</p>
      </div>
      <div class="text-wrapper">
        <h4>Ziel-Verteilung festlegen</h4>
        <p>Lege fest, wie dein optimales Portfolio Gleichgewicht aussehen soll.</p>
      </div>
      <div class="text-wrapper">
        <h4>Gleichgewicht herstellen</h4>
        <p>Mit dieser Grundlage kannst du alle unsere Rebalancing-Funktionen zu nutzen.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .empty-asset-list-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -35px;

    .empty-asset-list {
      width: 80%;
      max-width: 1265px;
      object-fit: contain;
    }

    .empty-list-grid {
      width: 90%;
      max-width: 1425px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 25px;

      .text-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 25px;

        h4 {
          width: 100%;
          text-align: center;
          color: $primary-text-color;
          font-size: 24px;
        }

        p {
          width: 80%;
          text-align: center;
          color: $secondary-text-color;
        }
      }
    }
  }
</style>
