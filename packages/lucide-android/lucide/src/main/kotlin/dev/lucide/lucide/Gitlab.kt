package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Gitlab: ImageVector
    get() {
        if (_gitlab != null) {
            return _gitlab!!
        }
        _gitlab = Builder(name = "Gitlab", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(22.0f, 13.29f)
                lineToRelative(-3.33f, -10.0f)
                arcToRelative(0.42f, 0.42f, 0.0f, false, false, -0.14f, -0.18f)
                arcToRelative(0.38f, 0.38f, 0.0f, false, false, -0.22f, -0.11f)
                arcToRelative(0.39f, 0.39f, 0.0f, false, false, -0.23f, 0.07f)
                arcToRelative(0.42f, 0.42f, 0.0f, false, false, -0.14f, 0.18f)
                lineToRelative(-2.26f, 6.67f)
                horizontalLineTo(8.32f)
                lineTo(6.1f, 3.26f)
                arcToRelative(0.42f, 0.42f, 0.0f, false, false, -0.1f, -0.18f)
                arcToRelative(0.38f, 0.38f, 0.0f, false, false, -0.26f, -0.08f)
                arcToRelative(0.39f, 0.39f, 0.0f, false, false, -0.23f, 0.07f)
                arcToRelative(0.42f, 0.42f, 0.0f, false, false, -0.14f, 0.18f)
                lineTo(2.0f, 13.29f)
                arcToRelative(0.74f, 0.74f, 0.0f, false, false, 0.27f, 0.83f)
                lineTo(12.0f, 21.0f)
                lineToRelative(9.69f, -6.88f)
                arcToRelative(0.71f, 0.71f, 0.0f, false, false, 0.31f, -0.83f)
                close()
            }
        }
        .build()
        return _gitlab!!
    }

private var _gitlab: ImageVector? = null
