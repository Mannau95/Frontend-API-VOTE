import React from "react";

function CréerUnVote() {
  return (
    <div>
      <h1>Créer un vote</h1>
      <form>
        <div>
          <label htmlFor="title">Titre du vote:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default CréerUnVote;
