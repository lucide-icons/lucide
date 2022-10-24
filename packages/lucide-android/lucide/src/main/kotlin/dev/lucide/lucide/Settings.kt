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

public val Lucide.Settings: ImageVector
    get() {
        if (_settings != null) {
            return _settings!!
        }
        _settings = Builder(name = "Settings", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.22f, 2.0f)
                horizontalLineToRelative(-0.44f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -2.0f, 2.0f)
                verticalLineToRelative(0.18f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -1.0f, 1.73f)
                lineToRelative(-0.43f, 0.25f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -2.0f, 0.0f)
                lineToRelative(-0.15f, -0.08f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -2.73f, 0.73f)
                lineToRelative(-0.22f, 0.38f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 0.73f, 2.73f)
                lineToRelative(0.15f, 0.1f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 1.0f, 1.72f)
                verticalLineToRelative(0.51f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -1.0f, 1.74f)
                lineToRelative(-0.15f, 0.09f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -0.73f, 2.73f)
                lineToRelative(0.22f, 0.38f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.73f, 0.73f)
                lineToRelative(0.15f, -0.08f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 2.0f, 0.0f)
                lineToRelative(0.43f, 0.25f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 1.0f, 1.73f)
                verticalLineTo(20.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.0f, 2.0f)
                horizontalLineToRelative(0.44f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.0f, -2.0f)
                verticalLineToRelative(-0.18f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 1.0f, -1.73f)
                lineToRelative(0.43f, -0.25f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 2.0f, 0.0f)
                lineToRelative(0.15f, 0.08f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.73f, -0.73f)
                lineToRelative(0.22f, -0.39f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -0.73f, -2.73f)
                lineToRelative(-0.15f, -0.08f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -1.0f, -1.74f)
                verticalLineToRelative(-0.5f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 1.0f, -1.74f)
                lineToRelative(0.15f, -0.09f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 0.73f, -2.73f)
                lineToRelative(-0.22f, -0.38f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -2.73f, -0.73f)
                lineToRelative(-0.15f, 0.08f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -2.0f, 0.0f)
                lineToRelative(-0.43f, -0.25f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -1.0f, -1.73f)
                verticalLineTo(4.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -2.0f, -2.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 12.0f)
                moveToRelative(-3.0f, 0.0f)
                arcToRelative(3.0f, 3.0f, 0.0f, true, true, 6.0f, 0.0f)
                arcToRelative(3.0f, 3.0f, 0.0f, true, true, -6.0f, 0.0f)
            }
        }
        .build()
        return _settings!!
    }

private var _settings: ImageVector? = null
