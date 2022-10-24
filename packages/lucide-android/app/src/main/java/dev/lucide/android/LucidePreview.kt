package dev.lucide

import android.content.res.Configuration
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import dev.lucide.lucide.Map


@Preview(name = "Light Mode", uiMode = Configuration.UI_MODE_NIGHT_NO)
@Preview(name = "Dark Mode", uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun LucidePreview() {
  MaterialTheme {
    Surface(modifier = Modifier.fillMaxSize()) {
      LucidePreviewContent()
    }
  }
}

@Composable
fun LucidePreviewContent() {
  Column(
    verticalArrangement = Arrangement.Center,
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    LazyVerticalGrid(
      columns = GridCells.Adaptive(minSize = 124.dp),
      verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
      items(Lucide.AllIcons) { icon ->
        Column(
          horizontalAlignment = Alignment.CenterHorizontally
        ) {

          Icon(
            modifier = Modifier.size(32.dp),
            imageVector = icon,
            contentDescription = icon.name
          )
          Text(
            text = icon.name,
            style = MaterialTheme.typography.body2
          )
        }
      }
    }
  }


}
