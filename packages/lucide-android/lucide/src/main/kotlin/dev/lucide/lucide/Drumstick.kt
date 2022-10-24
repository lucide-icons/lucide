package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Drumstick: ImageVector
    get() {
        if (_drumstick != null) {
            return _drumstick!!
        }
        _drumstick = Builder(name = "Drumstick", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.45f, 15.4f)
                curveToRelative(-2.13f, 0.65f, -4.3f, 0.32f, -5.7f, -1.1f)
                curveToRelative(-2.29f, -2.27f, -1.76f, -6.5f, 1.17f, -9.42f)
                curveToRelative(2.93f, -2.93f, 7.15f, -3.46f, 9.43f, -1.18f)
                curveToRelative(1.41f, 1.41f, 1.74f, 3.57f, 1.1f, 5.71f)
                curveToRelative(-1.4f, -0.51f, -3.26f, -0.02f, -4.64f, 1.36f)
                curveToRelative(-1.38f, 1.38f, -1.87f, 3.23f, -1.36f, 4.63f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(11.25f, 15.6f)
                lineToRelative(-2.16f, 2.16f)
                arcToRelative(2.5f, 2.5f, 0.0f, true, true, -4.56f, 1.73f)
                arcToRelative(2.49f, 2.49f, 0.0f, false, true, -1.41f, -4.24f)
                arcToRelative(2.5f, 2.5f, 0.0f, false, true, 3.14f, -0.32f)
                lineToRelative(2.16f, -2.16f)
            }
        }
        .build()
        return _drumstick!!
    }

private var _drumstick: ImageVector? = null
